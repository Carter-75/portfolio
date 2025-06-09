export default function Footer() {
  return (
    <footer className="footer has-background-success has-text-white-ter">
      <div className="content has-text-centered">
        <p>
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <p className="is-size-7">
          Built with Next.js, <a href="https://bulma.io" target="_blank" rel="noopener noreferrer" className="has-text-white-bis">Bulma</a>, Anime.js, and Three.js
        </p>
        <p>
          A template for showcasing your professional work.
        </p>
      </div>
    </footer>
  );
} 