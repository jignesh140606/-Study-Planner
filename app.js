
let studySessions = [];

function addSession(topic, sessionTime, duration) {
  try {
    if (!topic || topic.trim() === "") {
      throw new Error("Topic cannot be empty.");
    }
    if (isNaN(duration) || duration <= 0) {
      throw new Error("Duration must be a positive number.");
    }
    const sessionDate = new Date(sessionTime);
    if (isNaN(sessionDate.getTime())) {
      throw new Error("Invalid session time.");
    }

    const newSession = { topic, sessionTime: sessionDate, duration };
    studySessions.push(newSession);
    displayTodaysSessions();
    startSessionCountdown(newSession);
  } catch (error) {
    alert(error.message);
  }
}

function displayTodaysSessions() {
  const today = new Date().setHours(0, 0, 0, 0); 
  const endOfDay = new Date(today).setHours(23, 59, 59, 999); 

  const todaysSessions = studySessions.filter(session => {
    const sessionTime = new Date(session.sessionTime);
    return sessionTime >= today && sessionTime <= endOfDay;
  });

  const sessionsList = document.getElementById("sessionsList");
  sessionsList.innerHTML = "";

  todaysSessions.forEach(session => {
    const listItem = document.createElement("li");
    listItem.textContent = `${session.topic} at ${session.sessionTime.toLocaleTimeString()} for ${session.duration} minutes`;
    sessionsList.appendChild(listItem);
  });
}

function startSessionCountdown(session) {
  const now = new Date();
  const timeDifference = session.sessionTime - now;

  if (timeDifference > 0) {
    setTimeout(() => {
      alert(`Session on "${session.topic}" starts now!`);
    }, timeDifference);
  }
}

async function fetchStudyMaterials(topic) {
  try {
    const materials = await simulateFetchMaterials(topic);
    console.log("Study Materials for:", topic, materials);
    alert(`Study materials for "${topic}" have been fetched!`);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch study materials.");
  }
}

function simulateFetchMaterials(topic) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; 
      if (success) {
        resolve(`Materials for ${topic}: notes, videos, articles`);
      } else {
        reject(new Error("Failed to fetch materials."));
      }
    }, 2000); 
  });
}

document.getElementById("sessionForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const topic = document.getElementById("topic").value;
  const sessionTime = document.getElementById("sessionTime").value;
  const duration = parseInt(document.getElementById("duration").value);
  
  addSession(topic, sessionTime, duration);
  event.target.reset(); 
});

document.getElementById("fetchMaterialsButton").addEventListener("click", function() {
  const topic = prompt("Enter the topic to fetch materials for:");
  if (topic) {
    fetchStudyMaterials(topic);
  }
});

displayTodaysSessions();
