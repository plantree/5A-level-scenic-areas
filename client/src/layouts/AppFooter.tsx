export default function AppFooter() {
  return (
    <footer className="flex flex-col h-20 border-t border-slate-900/10 text-sm text-center justify-center">
      <img
        src="https://api.visitor.plantree.me/visitor-badge/pv?namespace=plantree.me&key=five-a-level-scenic-area"
        alt="Visitor Count"
        width="40"
        height="20"
        className="mx-auto"
      />
      <p>Released under the MIT License.</p>
      <div className="flex justify-center gap-2">
        <p>Copyright © 2023-present</p>
        <a
          href="https://plantree.me"
          className="link-hover"
          rel="noopener noreferrer"
          target="_blank"
        >
          Plantree
        </a>
      </div>
    </footer>
  );
}
