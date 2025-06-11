#
# X (Twitter) Post Generator & Automator for Carter's Fiverr Gig
#
# How to use:
# 1. Ensure you have a Chromium-based browser (Zen, Chrome, Edge) installed.
# 2. Run this script in your PowerShell terminal (right-click -> Run with PowerShell or type ./generate_post.ps1).
# 3. Follow the final instructions printed in the terminal.
#

# --- Configuration ---
$portfolioUrl = "https://carter-portfolio.fyi"
$fiverrUrl = "fiverr.com/s/e6xGa5Y"
$xComposeUrl = "https://twitter.com/compose/post"
$downloadsPath = "$env:USERPROFILE\Downloads"

# --- Post Templates (Now with over 30 unique options!) ---
$postTemplates = @(
    # Direct Promotion
    "Is your website losing customers? I build stunning, high-performance sites that capture attention. See my work: {0} or order on Fiverr: {1}",
    "Boost your business with a professional website! Starting at just $99 on Fiverr. Let's create something amazing together. Portfolio: {0} | Fiverr: {1}",
    "Need a stunning website for your business? I build custom sites starting at $99! Perfect for startups & small businesses. See my portfolio: {0} | Click here: {1}",
    "Stop using generic templates. Get a custom-coded website that is uniquely yours. Quality web design starting at $99. {0} | {1}",
    "Ready for a website that works as hard as you do? I deliver professional, results-driven websites for small businesses. Check my work: {0} & {1}",
    "From concept to launch, I provide a complete web design solution. Hassle-free, professional, and affordable. Get started on Fiverr: {1} | See portfolio: {0}",
    "Unlock your business potential with a stunning online presence. I'm here to build it for you. {0} & {1}",
    "Your search for a reliable web developer ends here. Top-quality service on Fiverr. {1} | See my past projects: {0}",

    # Value & Tip Focused
    "Website Tip: Above-the-fold content is what users see first. Make it count! I can help you design a stunning first impression. {0} | {1}",
    "Slow website speed is a conversion killer. I build lightning-fast sites optimized for performance. Let's get your business up to speed! {0} & {1}",
    "Good design isn't just about looks, it's about building trust. Let's build a trustworthy, professional site for your brand. {0} | {1}",
    "Did you know a clear Call-to-Action can triple your conversion rates? I specialize in user-focused design that gets results. {0} & {1}",
    "Struggling with a dull website? I craft custom sites that impress! Check my work: {0} & {1}. Tip: A fast-loading site boosts traffic by 20%—let's make it happen!",

    # Engagement & Question Focused
    "Is your current website mobile-friendly? Over 60% of web traffic is on mobile! Don't miss out on customers. DM me for a free audit! {0} | {1}",
    "What's the #1 thing you wish your website could do? I love a good challenge! Let's talk about custom features. {0} & {1}",
    "Thinking about launching a new project or business? You'll need a great website. Let me handle the technical stuff for you! {0} | {1}",
    "Does your website truly represent your brand's quality? If not, we should talk. I build premium sites for premium businesses. {0} & {1}",
    "Does your site feel more like a ghost town than a bustling storefront? Let's change that with engaging design and clear navigation. {0} | {1}",

    # Passion & Project Focused
    "From interactive animations to physics sandboxes, I love building fun things for the web. Imagine what I could build for your business! Portfolio: {0} | Hire me: {1}",
    "Coding is my passion. Building beautiful, functional websites is my craft. Let's combine them for your next project! {0} & {1}",
    "I don't just build websites, I build digital experiences. From animations to interactive elements, let's make your site memorable. {0} | {1}",
    "Another day, another creative idea brought to life with code. What can I build for you? {0} & {1}",

    # Special Offers
    "This week only, get a FREE logo design with your website order! A complete branding package for your startup. Check it out: {0} | Fiverr Gig: {1}",
    "Limited time offer! Get a FREE 1-hour consultation on your existing website's design and performance. No strings attached. DM me! See my work: {0} | {1}",
    
    # Simple & Direct
    "Let's build your dream website. {0} | {1}",
    "Custom websites that get results. {0} & {1}",
    "Affordable. Professional. Custom-built for you. {0} | {1}",
    "Your online presence matters. Let's make it amazing. {0} | {1}",
    "Let's create something beautiful together. {0} | {1}",
    "Websites that build brands. Check out my work. {0} & {1}",
    "Got an idea? I can build it. {0} | {1}"
)

# --- Hashtag Pool ---
$hashtags = @(
    "#WebDesign", "#Fiverr", "#SmallBusiness", "#Startups", "#FiverrGigs",
    "#CustomWebsite", "#Portfolio", "#WebDev", "#Tech", "#WebsiteDeveloper",
    "#Freelance", "#DigitalMarketing", "#UIUX", "#SmallBiz", "#Creative"
)

# --- Functions ---

function Find-BrowserPath {
    $browserPaths = @(
        # --- IMPORTANT ---
        # If the script can't find your browser, paste the path from its shortcut's 'Target' field here.
        # Example: "C:\MyCustomFolder\Zen\zen.exe",
        
        "$env:LOCALAPPDATA\Programs\Zen\zen.exe",           # Zen Browser
        "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
        "$env:ProgramFiles (x86)\Google\Chrome\Application\chrome.exe",
        "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    )

    foreach ($path in $browserPaths) {
        if (Test-Path $path) {
            return $path
        }
    }
    return $null
}

function Show-DownloadsFolder {
    # This C# code allows PowerShell to focus a window
    Add-Type -TypeDefinition @"
    using System;
    using System.Runtime.InteropServices;
    public class Win32 {
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool SetForegroundWindow(IntPtr hWnd);
    }
"@ -ErrorAction SilentlyContinue

    $shell = New-Object -ComObject Shell.Application
    
    # Format the path into the URL format used by File Explorer
    $downloadsUrl = "file:///$($downloadsPath.Replace('\', '/'))"

    # Find the Downloads window among all open Explorer windows
    $explorerWindow = $shell.Windows() | Where-Object { $_.LocationURL -eq $downloadsUrl -and $_.Name -eq "File Explorer" }

    if ($explorerWindow) {
        # If found, bring it to the front
        [Win32]::SetForegroundWindow($explorerWindow.HWND) | Out-Null
    } else {
        # If not found, open a new one
        Start-Process "explorer.exe" -ArgumentList $downloadsPath
    }
}

function Stop-OldCleanupJobs {
    Write-Host "Searching for and stopping old cleanup timers..." -ForegroundColor Cyan
    $oldTimers = Get-CimInstance Win32_Process -Filter "name = 'powershell.exe' AND CommandLine LIKE '%Start-Sleep -Seconds 60%Portfolio_Screenshot_%'"
    
    if ($oldTimers) {
        $oldTimers | ForEach-Object {
            Write-Host "Stopping old timer process (PID: $($_.ProcessId))" -ForegroundColor Gray
            Stop-Process -Id $_.ProcessId -Force
        }
    }
}

# --- Script Logic ---

# 1. Stop any old, lingering cleanup timers from previous runs
Stop-OldCleanupJobs

# 2. Clean up old screenshots from previous runs
Write-Host "Cleaning up old screenshots..." -ForegroundColor Cyan
Get-ChildItem -Path $downloadsPath -Filter "Portfolio_Screenshot_*.png" | ForEach-Object {
    Write-Host "Removing old file: $($_.Name)" -ForegroundColor Gray
    Remove-Item -Path $_.FullName -Force
}

# 3. Generate the post text
$randomTemplate = Get-Random -InputObject $postTemplates
$randomHashtags = $hashtags | Get-Random -Count (Get-Random -Minimum 3 -Maximum 4)
$hashtagString = $randomHashtags -join " "
$finalPost = ($randomTemplate -f $portfolioUrl, $fiverrUrl) + " " + $hashtagString

# 4. Copy post to clipboard
$finalPost | Set-Clipboard

# 5. Find Browser
$browser = Find-BrowserPath
if (-not $browser) {
    Write-Host "--- ERROR ---" -ForegroundColor Red
    Write-Output "Could not find Zen, Chrome, or Edge."
    Write-Output "The post text has been copied to your clipboard, but you'll need to take a screenshot manually."
    exit
}

# 6. Take Screenshot
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$screenshotPath = Join-Path $downloadsPath "Portfolio_Screenshot_$timestamp.png"

Write-Host "Taking screenshot..." -ForegroundColor Cyan
try {
    Start-Process -FilePath $browser -ArgumentList "--headless", "--disable-gpu", "--screenshot=`"$screenshotPath`"", "--window-size=1280,800", $portfolioUrl -NoNewWindow -Wait
}
catch {
    Write-Host "--- ERROR ---" -ForegroundColor Red
    Write-Output "Failed to take screenshot. Your browser might be open. Please close all windows for '$((Get-Item $browser).BaseName)' and try again."
    Write-Output "The post text is still on your clipboard."
    exit
}


if (-not (Test-Path $screenshotPath)) {
     Write-Host "--- ERROR ---" -ForegroundColor Red
     Write-Output "Screenshot command ran, but the file was not created. Please try again."
     exit
}

# 7. Launch everything for the user
Write-Host "Launching browser and downloads folder..." -ForegroundColor Cyan
Start-Process -FilePath $browser -ArgumentList $xComposeUrl
Show-DownloadsFolder

# 8. Schedule the new, smarter screenshot cleanup
$cleanupScript = {
    param($path, $filter)
    Start-Sleep -Seconds 60
    Get-ChildItem -Path $path -Filter $filter | ForEach-Object { Remove-Item -Path $_.FullName -Force }
}
$deleteCommand = "Start-Sleep -Seconds 60; Get-ChildItem -Path `"$downloadsPath`" -Filter `"Portfolio_Screenshot_*.png`" | ForEach-Object { Remove-Item -Path `$_.FullName -Force };"
Start-Process powershell.exe -ArgumentList "-Command `"$deleteCommand`"" -WindowStyle Hidden


# --- Final Output ---
Write-Host "--- Automation Complete! ---" -ForegroundColor Green
Write-Output ""
Write-Host "Your post text has been copied to the clipboard." -ForegroundColor Yellow
Write-Host "Screenshot saved as '$((Get-Item $screenshotPath).Name)' in your Downloads folder." -ForegroundColor Yellow
Write-Host "NOTE: The screenshot will be automatically deleted in 1 minute." -ForegroundColor Magenta
Write-Output ""
Write-Host "--- Your Turn! ---" -ForegroundColor Green
Write-Output "1. Arrange the windows on your screen (Tip: use Win + Left/Right Arrow)."
Write-Output "2. Paste the text into the X compose box (Ctrl + V)."
Write-Output "3. Drag the screenshot from your Downloads folder onto the X page."
Write-Output "4. Click 'Post'!" 