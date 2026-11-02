export default function App() {
  return (
    <div className="page">
      <header className="masthead">
        <span className="wordmark">You<span className="ampersand">&</span>Me<span className="brand-dot">.</span></span>
        <span className="prototype-label">Investor prototype</span>
      </header>
      <main id="main-content">
        <p className="eyebrow">A foundation for everyday wellbeing</p>
        <h1>A little structure.<br />More room for you.</h1>
        <p className="intro">You&Me is taking shape around practical Fitness and Nutrition journeys.</p>
        <section className="notice" aria-labelledby="status-heading">
          <span className="status-mark" aria-hidden="true" />
          <div>
            <h2 id="status-heading">Frontend foundation</h2>
            <p>Working journeys are not implemented yet. This is a scaffold for local review.</p>
          </div>
        </section>
        <p className="scope-note">Planning, profiles and progress will arrive in later deliveries. There is no live AI connection or payment flow here.</p>
      </main>
      <footer><span>You&Me</span><span>One thoughtful step at a time.</span></footer>
    </div>
  )
}
