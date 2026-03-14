document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     1. Course Category Filtering (index.html)
  ========================================================== */
  const filterButtons = document.querySelectorAll(".category-filter");
  const courseCards = document.querySelectorAll(".course-card");

  if (filterButtons.length > 0 && courseCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class styling from all
        filterButtons.forEach(btn => {
          btn.classList.remove("bg-brand-500", "text-slate-900", "border-brand-500");
          btn.classList.add("bg-slate-100", "text-slate-700", "border-slate-300");
        });

        // Add active class styling to clicked
        button.classList.remove("bg-slate-100", "text-slate-700", "border-slate-300");
        button.classList.add("bg-brand-500", "text-slate-900", "border-brand-500");

        const filterValue = button.getAttribute("data-filter");

        // Filter cards
        courseCards.forEach(card => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "flex";
            // Re-trigger animation
            card.style.animation = "none";
            card.offsetHeight; /* trigger reflow */
            card.style.animation = null;
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* =========================================================
     2. Simple Search Bar Simulation (index.html)
  ========================================================== */
  const searchBar = document.getElementById("search-bar");
  if (searchBar && courseCards.length > 0) {
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      courseCards.forEach(card => {
        const title = card.querySelector("h4").innerText.toLowerCase();
        if (title.includes(searchTerm)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  /* =========================================================
     3. Module Accordion Toggle (course-details.html / video-learning.html)
  ========================================================== */
  // Minimal script setup: clicking a section row toggles visibility of its content
  // In our static layout, we usually toggle max-height or display.
  // We'll leave it as a visual structure for now as per HTML.
  
  /* =========================================================
     4. Completion Checkbox (video-learning.html)
  ========================================================== */
  const completeCheckbox = document.getElementById("mark-complete");
  if (completeCheckbox) {
    completeCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        // Trigger a simple confetti or notification
        console.log("Lecture completed!");
        // Update styling of the label optionally
        e.target.parentElement.classList.add("border-emerald-500", "bg-emerald-500/10");
        e.target.parentElement.classList.remove("border-slate-300", "bg-slate-800/40");
      } else {
        e.target.parentElement.classList.remove("border-emerald-500", "bg-emerald-500/10");
        e.target.parentElement.classList.add("border-slate-300", "bg-slate-800/40");
      }
    });
  }

  /* =========================================================
     5. Chart.js Initialization (dashboard.html)
  ========================================================== */
  const chartCanvas = document.getElementById("activityChart");
  if (chartCanvas && typeof Chart !== "undefined") {
    const ctx = chartCanvas.getContext("2d");
    
    // Gradient fill for line chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(234, 179, 8, 0.4)");   // brand-500 with opacity
    gradient.addColorStop(1, "rgba(234, 179, 8, 0.0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Learning Hours",
          data: [1.5, 2.0, 1.2, 3.5, 2.2, 4.0, 3.1],
          borderColor: "#eab308", // brand-500
          backgroundColor: gradient,
          borderWidth: 2,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#eab308",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4 // Smooth curves
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#0f172a",
            bodyColor: "#64748b",
            borderColor: "#e2e8f0",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0, 0, 0, 0.05)", drawBorder: false },
            ticks: { color: "#64748b", stepSize: 1 } // slate-500
          },
          x: {
            grid: { display: false, drawBorder: false },
            ticks: { color: "#64748b" }
          }
        },
        interaction: {
          intersect: false,
          mode: "index",
        }
      }
    });
  }
});
