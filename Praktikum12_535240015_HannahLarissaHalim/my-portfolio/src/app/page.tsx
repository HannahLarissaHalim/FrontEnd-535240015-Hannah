import Image from "next/image"; 

export default function Home() {
  return (
    <main className="fade-in">
      {/* navbar atas */}
      <nav className="navbar navbar-expand-lg navbar-custom py-3 fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Portfolio Hannah
          </a>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* section profile */}
      <section
        id="profile"
        className="section-container container mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4"
        style={{ marginTop: "9rem" }}
      >
        <div className="text-md-start text-center">
          <h1 className="fw-bold mb-3" style={{ color: "#FF4DA6" }}>
            Hi, I&apos;m Hannah
          </h1>
          <p className="fs-5 text-secondary">
            I&apos;m an Informatics Engineering student who&apos;s deeply
            interested in almost every field of IT — but hasn&apos;t mastered a
            single one yet. Still, everything about technology makes me curious,
            and I love learning something new every day.
          </p>
        </div>

        {/* foto profil */}
        <div className="text-center">
          <Image
            src="/profile.jpg"
            alt="Hannah"
            width={230}
            height={230}
            className="rounded-circle shadow-sm border border-3 border-light"
            priority
          />
        </div>
      </section>

      {/* section projects */}
      <section
        id="projects"
        className="section-container container text-center mb-5"
      >
        <h2 className="fw-bold mb-4" style={{ color: "#FF4DA6" }}>
          My Projects
        </h2>
        <div className="row g-4 justify-content-center">
          {/* project 1 */}
          <div className="col-md-4 col-sm-6">
            <div className="card p-3 h-100 shadow-sm">
              <h5 className="card-title text-primary fw-semibold">
                Instagram Clone
              </h5>
              <p className="card-text text-secondary">
                Full-stack web app built with Laravel and MySQL. Includes login,
                update bio, and Instagram-style feed.
              </p>
            </div>
          </div>

          {/* project 2 */}
          <div className="col-md-4 col-sm-6">
            <div className="card p-3 h-100 shadow-sm">
              <h5 className="card-title text-primary fw-semibold">
                HopOn JKT Mobile App
              </h5>
              <p className="card-text text-secondary">
                Flutter-based MRT Jakarta ticketing app connected with Firebase
                Auth and Firestore realtime.
              </p>
            </div>
          </div>

          {/* project 3 */}
          <div className="col-md-4 col-sm-6">
            <div className="card p-3 h-100 shadow-sm">
              <h5 className="card-title text-primary fw-semibold">
                Nusantara Folklore Library
              </h5>
              <p className="card-text text-secondary">
                Responsive web app that showcases Indonesian folklore with
                bookmarks and region filters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
