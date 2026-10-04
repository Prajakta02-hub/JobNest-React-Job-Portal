import { useMemo, useState } from "react";
import "./App.css";

const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Mumbai",
    type: "Full Time",
    experience: "0-2 Years",
    salary: "₹5 - 8 LPA",
    skills: ["React", "JavaScript", "CSS"],
    description:
      "Build responsive and user-friendly web applications using modern frontend technologies."
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "DataWorks",
    location: "Pune",
    type: "Full Time",
    experience: "0-2 Years",
    salary: "₹4 - 7 LPA",
    skills: ["Python", "SQL", "Excel"],
    description:
      "Analyze business data and create meaningful reports to support business decisions."
  },
  {
    id: 3,
    title: "React Developer Intern",
    company: "Innovate Labs",
    location: "Bangalore",
    type: "Internship",
    experience: "Fresher",
    salary: "₹15K - ₹25K/month",
    skills: ["React", "JavaScript", "Git"],
    description:
      "Work with the development team to create modern and responsive React applications."
  },
  {
    id: 4,
    title: "Python Developer",
    company: "CodeSphere",
    location: "Mumbai",
    type: "Full Time",
    experience: "1-3 Years",
    salary: "₹6 - 10 LPA",
    skills: ["Python", "Django", "SQL"],
    description:
      "Develop scalable backend applications and REST APIs using Python."
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "PixelCraft",
    location: "Remote",
    type: "Full Time",
    experience: "0-2 Years",
    salary: "₹4 - 7 LPA",
    skills: ["Figma", "UI Design", "UX"],
    description:
      "Design simple and engaging digital experiences for web and mobile applications."
  },
  {
    id: 6,
    title: "Java Developer Intern",
    company: "SoftBridge",
    location: "Hyderabad",
    type: "Internship",
    experience: "Fresher",
    salary: "₹12K - ₹20K/month",
    skills: ["Java", "Spring", "SQL"],
    description:
      "Learn and contribute to backend development using Java and Spring technologies."
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplications, setShowApplications] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesLocation =
        !location ||
        job.location.toLowerCase().includes(location.toLowerCase().trim());

      const matchesType =
        jobType === "All" || job.type === jobType;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [search, location, jobType]);

  const toggleSave = (id) => {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id]
    );
  };

  const applyForJob = (job) => {
    if (!applications.includes(job.id)) {
      setApplications((previous) => [...previous, job.id]);
      alert(`Application submitted for ${job.title}`);
    } else {
      alert("You have already applied for this job.");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("All");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Job<span>Nest</span>
        </div>

        <div className="nav-links">
          <button
            className={!showApplications ? "active-nav" : ""}
            onClick={() => setShowApplications(false)}
          >
            Jobs
          </button>

          <button
            className={showApplications ? "active-nav" : ""}
            onClick={() => setShowApplications(true)}
          >
            Applications
            {applications.length > 0 && (
              <span className="nav-count">{applications.length}</span>
            )}
          </button>
        </div>

        <div className="profile">
          <div className="profile-circle">P</div>
          <span>Candidate</span>
        </div>
      </nav>

      {!showApplications ? (
        <>
          <section className="hero">
            <div>
              <p className="hero-label">CAREER OPPORTUNITIES</p>
              <h1>
                Find a job that
                <br />
                fits your <span>future.</span>
              </h1>
              <p className="hero-text">
                Explore opportunities from companies looking for talented
                people like you.
              </p>
            </div>

            <div className="hero-card">
              <div className="hero-number">{jobsData.length}+</div>
              <p>Open Opportunities</p>
            </div>
          </section>

          <section className="search-section">
            <div className="search-box">
              <div className="input-group">
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Job title, skill or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Mumbai, Pune..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option>All</option>
                  <option>Full Time</option>
                  <option>Internship</option>
                </select>
              </div>

              <button className="search-btn">Search</button>
            </div>
          </section>

          <main className="content">
            <aside className="sidebar">
              <div className="filter-header">
                <h3>Filters</h3>
                <button onClick={clearFilters}>Clear</button>
              </div>

              <div className="filter-group">
                <h4>Job Type</h4>

                <label>
                  <input
                    type="radio"
                    name="type"
                    checked={jobType === "All"}
                    onChange={() => setJobType("All")}
                  />
                  All Jobs
                </label>

                <label>
                  <input
                    type="radio"
                    name="type"
                    checked={jobType === "Full Time"}
                    onChange={() => setJobType("Full Time")}
                  />
                  Full Time
                </label>

                <label>
                  <input
                    type="radio"
                    name="type"
                    checked={jobType === "Internship"}
                    onChange={() => setJobType("Internship")}
                  />
                  Internship
                </label>
              </div>

              <div className="filter-group">
                <h4>Quick Search</h4>

                <button
                  className="quick-filter"
                  onClick={() => setSearch("React")}
                >
                  React Jobs
                </button>

                <button
                  className="quick-filter"
                  onClick={() => setSearch("Python")}
                >
                  Python Jobs
                </button>

                <button
                  className="quick-filter"
                  onClick={() => setLocation("Mumbai")}
                >
                  Mumbai Jobs
                </button>
              </div>
            </aside>

            <section className="jobs-section">
              <div className="jobs-header">
                <h2>Available Jobs</h2>
                <p>{filteredJobs.length} opportunities found</p>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="jobs-grid">
                  {filteredJobs.map((job) => (
                    <div className="job-card" key={job.id}>
                      <div className="job-top">
                        <div className="company-logo">
                          {job.company.charAt(0)}
                        </div>

                        <button
                          className={`save-btn ${
                            savedJobs.includes(job.id) ? "saved" : ""
                          }`}
                          onClick={() => toggleSave(job.id)}
                          aria-label="Save job"
                        >
                          {savedJobs.includes(job.id) ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="job-info">
                        <span className="job-type">{job.type}</span>
                        <h3>{job.title}</h3>
                        <p className="company">{job.company}</p>
                        <p className="location">📍 {job.location}</p>
                        <p className="salary">{job.salary}</p>

                        <div className="skills">
                          {job.skills.map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          className="details-btn"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </button>

                        <button
                          className="apply-btn"
                          onClick={() => applyForJob(job)}
                        >
                          {applications.includes(job.id) ? "Applied" : "Apply"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div>🔎</div>
                  <h3>No jobs found</h3>
                  <p>Try changing your search or filters.</p>
                  <button className="apply-btn" onClick={clearFilters}>
                    Reset Filters
                  </button>
                </div>
              )}
            </section>
          </main>
        </>
      ) : (
        <section className="applications-page">
          <div className="page-heading">
            <p className="hero-label">YOUR ACTIVITY</p>
            <h1>My Applications</h1>
            <p>Track the jobs you have applied for.</p>
          </div>

          <div className="application-stats">
            <div>
              <strong>{applications.length}</strong>
              <span>Applications</span>
            </div>

            <div>
              <strong>{savedJobs.length}</strong>
              <span>Saved Jobs</span>
            </div>

            <div>
              <strong>{jobsData.length}</strong>
              <span>Total Jobs</span>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="no-results">
              <div>📄</div>
              <h3>No applications yet</h3>
              <p>Apply to a job to see it here.</p>
              <button
                className="apply-btn"
                onClick={() => setShowApplications(false)}
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="application-list">
              {jobsData
                .filter((job) => applications.includes(job.id))
                .map((job) => (
                  <div className="application-card" key={job.id}>
                    <div className="company-logo">
                      {job.company.charAt(0)}
                    </div>

                    <div>
                      <h3>{job.title}</h3>
                      <p>
                        {job.company} • {job.location}
                      </p>
                    </div>

                    <span className="status">Applied</span>
                  </div>
                ))}
            </div>
          )}
        </section>
      )}

      {selectedJob && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedJob(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>

            <div className="modal-logo">
              {selectedJob.company.charAt(0)}
            </div>

            <span className="job-type">{selectedJob.type}</span>
            <h2>{selectedJob.title}</h2>

            <p className="company">
              {selectedJob.company} • {selectedJob.location}
            </p>

            <div className="modal-details">
              <div>
                <strong>Salary</strong>
                <span>{selectedJob.salary}</span>
              </div>
              <div>
                <strong>Experience</strong>
                <span>{selectedJob.experience}</span>
              </div>
            </div>

            <h3>About the role</h3>
            <p className="description">{selectedJob.description}</p>

            <h3>Required Skills</h3>
            <div className="skills">
              {selectedJob.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <button
              className="modal-apply"
              onClick={() => {
                applyForJob(selectedJob);
                setSelectedJob(null);
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 JobNest • React.js Job Portal</p>
      </footer>
    </div>
  );
}

export default App;