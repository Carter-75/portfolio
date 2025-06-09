export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          &copy; {new Date().getFullYear()} WEB MAGIC BY CARTER. All rights reserved.
        </p>
        <p className="is-size-7">
          Built with Next.js, <a href="https://bulma.io" target="_blank" rel="noopener noreferrer">Bulma</a>, and Anime.js.
        </p>
      </div>
    </footer>
  );
} 