import os
import requests
from pathlib import Path
from dotenv import load_dotenv

def sync_vercel_env():
    """
    Reads the root .env.local and syncs each variable to the Vercel Production vault 
    using the official REST API.
    """
    env_path = Path('.env.local')
    
    if not env_path.exists():
        print("❌ No .env.local file found in the root. Skipping sync.")
        return

    # Load credentials from .env.local
    load_dotenv(dotenv_path=env_path)

    # Vercel Configuration
    VERCEL_TOKEN = os.getenv('VERCEL_TOKEN')
    VERCEL_PROJECT_ID = os.getenv('VERCEL_PROJECT_ID')

    if not VERCEL_TOKEN or not VERCEL_PROJECT_ID:
        print("\033[91mFATAL ERROR: VERCEL_TOKEN or VERCEL_PROJECT_ID not found in .env.local\033[0m")
        print("Please add these variables to allow synchronization.")
        return

    print(f"\033[94mVercel Watcher: Syncing local .env.local to Production Vault (Project: {VERCEL_PROJECT_ID})...\033[0m")
    
    # Parse file manually to preserve key names and handle values precisely
    env_vars = {}
    with open(env_path, "r", encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip()
            # Strip surrounding quotes if they exist
            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                val = val[1:-1]
            env_vars[key] = val

    # REST API Interaction Setup
    headers = {
        'Authorization': f'Bearer {VERCEL_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    # 1. Fetch existing environment variables to know if we POST or PATCH
    try:
        res = requests.get(f'https://api.vercel.com/v9/projects/{VERCEL_PROJECT_ID}/env', headers=headers)
        res.raise_for_status()
        existing_env = res.json().get('envs', [])
    except Exception as e:
        print(f"\033[91mERROR: Failed to fetch existing environment variables: {e}\033[0m")
        return

    # Filter out Vercel credentials and project identifiers
    keys_to_sync = [k for k in env_vars.keys() if k not in ['VERCEL_TOKEN', 'VERCEL_PROJECT_ID']]
    print(f"INFO: Identified {len(keys_to_sync)} variables for synchronization.")

    for key in keys_to_sync:
        val = env_vars[key]
        
        # SHARED LOGIC:
        # Variables required by both Frontend and Backend (e.g. URI, PRODUCTION) 
        # are pushed WITHOUT prefix. All others get NG_APP_ for Angular.
        SHARED_LIST = ['MONGODB_URI', 'PRODUCTION', 'PROJECT_NAME', 'PROD_FRONTEND_URL', 'PROD_BACKEND_URL', 'RESUME_URL', 'PORT', 'OPENAI_API_KEY', 'CRON_SECRET']
        target_key = key if key in SHARED_LIST else f'NG_APP_{key}'
        
        # SECURE SKIP CHECK (Extra redundancy)
        if key in ['VERCEL_TOKEN', 'VERCEL_PROJECT_ID']:
            print(f"\033[93m   SECURE SKIP: {key}\033[0m")
            continue

        # Look for existing variable in production target
        existing_var = next((e for e in existing_env if e['key'] == target_key and 'production' in e['target']), None)

        try:
            if existing_var:
                print(f"   UPDATING: {target_key}...")
                # PATCH for update requires the variable ID
                patch_res = requests.patch(
                    f"https://api.vercel.com/v9/projects/{VERCEL_PROJECT_ID}/env/{existing_var['id']}",
                    headers=headers,
                    json={'value': val, 'target': ['production']}
                )
                patch_res.raise_for_status()
                print(f"\033[92m      Synced (Updated): {target_key}\033[0m")
            else:
                print(f"   CREATING: {target_key}...")
                # POST for initial creation
                post_res = requests.post(
                    f"https://api.vercel.com/v10/projects/{VERCEL_PROJECT_ID}/env",
                    headers=headers,
                    json={
                        'key': target_key,
                        'value': val,
                        'type': 'encrypted',
                        'target': ['production']
                    }
                )
                post_res.raise_for_status()
                print(f"\033[92m      Synced (Created): {target_key}\033[0m")
        except Exception as e:
            # Handle specific API errors if available
            error_data = getattr(e.response, 'json', lambda: {})()
            error_msg = error_data.get('error', {}).get('message', str(e))
            print(f"\033[91m   [!] Failed to sync {target_key}: {error_msg}\033[0m")

    print("\033[94mVercel Vault is now up to date.\033[0m")

if __name__ == "__main__":
    sync_vercel_env()
