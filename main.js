document.addEventListener("DOMContentLoaded", function() {
  const track = document.getElementById("image-track");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
      if(track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 2;
      
      let percentage = (mouseDelta / maxDelta) * -100;
      let nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
      let nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      
      // Check if nextPercentage is NaN, and if so, set it to 0
      if (isNaN(nextPercentage)) {
          nextPercentage = 0;
      }
      
      track.dataset.percentage = nextPercentage;
      
      track.animate({
          transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("image")) {
          // Check if nextPercentage is NaN, and if so, set it to 0
          const validPercentage = isNaN(nextPercentage) ? 0 : nextPercentage;
          image.animate({
              objectPosition: `${100 + validPercentage}% center`
          }, { duration: 1200, fill: "forwards" });
      }
  };
    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = e => handleOnDown(e);

    window.ontouchstart = e => handleOnDown(e.touches[0]);

    window.onmouseup = e => handleOnUp(e);

    window.ontouchend = e => handleOnUp(e.touches[0]);

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);

});


  // Define personal information
  var fullName = "Kopano El Nkitseng Matlala";
  var bio = "I have a natural inclination for problem-solving and find the most joy when facing challenges. In addition to my passion for farming and selling trees as a hobby, I have also ventured into the field of software development. Throughout my life, I have been actively involved in various business endeavors, assisting numerous enterprises in their growth. Additionally, I've had the opportunity to contribute to the development of products available on the Play Store upon request.";
  var socialLinks = [
      { platform: "Facebook", url: "https://web.facebook.com/kopano.matlala" },
      { platform: "Twitter", url: "https://twitter.com/Kopzido" },
      { platform: "Instagram", url: "https://www.instagram.com/kopanoelnkitsengmatlala/" }
  ];


  // Populate HTML elements with data
  document.getElementById("about-content").innerText = bio;
  var socialLinksList = document.getElementById("social-links");
  socialLinks.forEach(link => {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", link.url);
      a.innerHTML = `<i class="ri-${link.platform.toLowerCase()}-fill"></i>`;
      li.appendChild(a);
      socialLinksList.appendChild(li);
  });
  

  // Education background
  var education = [
      {
          degree: "Hyperion Certificate & Software Engineering",
          timeframe: "2022 - 2023",
          institution: "Hyperion Dev, Rosebank onsite",
          description: "Course mainly consisted of Python, SQL, and Django framework for 3 months."
      },
      {
          degree: "N5 Mechanical Draughting & Mechanical and Civil Draughting",
          timeframe: "2012 - 2014",
          institution: "Westcol Krugersdorp-west campus",
          description: "My course consisted of mechanical CAD Draughting in CAD and Civil Draughting, ending at N5."
      }
  ];

  var educationContainer = document.getElementById("education");
  education.forEach(edu => {
      var item = document.createElement("div");
      item.classList.add("resume-item");
      item.innerHTML = `
          <h4>${edu.degree}</h4>
          <h5>${edu.timeframe}</h5>
          <p><em>${edu.institution}</em></p>
          <p>${edu.description}</p>
      `;
      educationContainer.appendChild(item);
  });

  // Professional experience
  var experience = [
      {
          title: "Entrepreneur",
          timeframe: "2009 - Present",
          company: "Blue Eland (pty) ltd - Gauteng",
          responsibilities: [
              "Started by selling sweets, then started importing women's clothing from China through my Aunt who was CEO of Brand Africa, Tebogo Lefifi.",
              "The business transformed into a consulting and training establishment.",
              "Created all the digital content, marketing content, and personally sold everything.",
              "Currently venturing into the tech-world, building solutions as a hobby."
          ]
      },
      {
          title: "Quality Assurer",
          timeframe: "2018",
          company: "Department Of Higher Education - South Africa",
          responsibilities: [
              "Part of a marking center at Tswane South College, ensuring all papers are valid and none are compromised or illegally placed.",
              "Checked all submissions match the database, ensuring no errors were made."
          ]
      }
  ];

  // Get the container for professional experience
  var experienceContainer = document.getElementById("experience");

  // Iterate over each experience item and create HTML elements to display them
  experience.forEach(exp => {
      // Create a div element for each experience item
      var item = document.createElement("div");
      item.classList.add("resume-item");

      // Generate HTML content for the experience item
      var responsibilitiesList = exp.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('');
      item.innerHTML = `
          <h4>${exp.title}</h4>
          <h5>${exp.timeframe}</h5>
          <p><em>${exp.company}</em></p>
          <ul>${responsibilitiesList}</ul>
      `;

      // Append the generated HTML to the experience container
      experienceContainer.appendChild(item);
  });
  
// error handling for the form 
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const requestInput = document.getElementById("request");

    // Remove any previous error messages and styles
    clearErrors();

    // Validate form inputs
    if (!nameInput.value.trim() || !emailInput.value.trim() || !requestInput.value.trim()) {
        // If any field is empty, display an error message and apply invalid input style
        displayErrorMessage("Please fill out all fields.");
        return; // Exit the function to prevent further execution
    }

    // If all fields are filled out, submit the form
    contactForm.submit();
});

// Function to display an error message
function displayErrorMessage(message) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    contactForm.appendChild(errorMessage);
}

// Function to clear any previous error messages and styles
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => message.remove());

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => input.classList.remove("invalid-input"));
}