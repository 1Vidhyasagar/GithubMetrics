document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");

  // Progress elements
  const easyProgressCircle = document.getElementById("easy-progress");
  const mediumProgressCircle = document.getElementById("medium-progress");
  const hardProgressCircle = document.getElementById("hard-progress");

  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");

  // Overall stats elements
  const totalSolvedLabel = document.getElementById("total-solved");
  const totalQuestionsLabel = document.getElementById("total-questions");
  const acceptanceRateLabel = document.getElementById("acceptance-rate");
  const rankingLabel = document.getElementById("ranking");
  const reputationLabel = document.getElementById("reputation");

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch user details");
      }
      const parsedData = await response.json();
      console.log("Logging data:", parsedData);

      if (!parsedData.totalSolved) {
        alert("No data found for this username.");
        return;
      }

      displayUserData(parsedData);
    } catch (error) {
      alert("Error fetching data");
      console.error(error);
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    if (total === 0) return;
    const progressDegree = (solved / total) * 100;
    circle.style.background = `conic-gradient(#299f5d ${progressDegree}%, #283a2e 0%)`;
    label.textContent = `${solved}/${total}`;
  }

  function displayUserData(parsedData) {
    const totalEasyQues = parsedData.totalEasy || 0;
    const totalMediumQues = parsedData.totalMedium || 0;
    const totalHardQues = parsedData.totalHard || 0;

    const solvedTotalEasyQues = parsedData.easySolved || 0;
    const solvedTotalMediumQues = parsedData.mediumSolved || 0;
    const solvedTotalHardQues = parsedData.hardSolved || 0;

    // Update progress bars
    updateProgress(
      solvedTotalEasyQues,
      totalEasyQues,
      easyLabel,
      easyProgressCircle
    );
    updateProgress(
      solvedTotalMediumQues,
      totalMediumQues,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(
      solvedTotalHardQues,
      totalHardQues,
      hardLabel,
      hardProgressCircle
    );

    // Update overall stats
    totalSolvedLabel.textContent = parsedData.totalSolved || 0;
    totalQuestionsLabel.textContent = parsedData.totalQuestions || 0;
    acceptanceRateLabel.textContent = `${parsedData.acceptanceRate || 0}%`;
    rankingLabel.textContent = parsedData.ranking || "N/A";
    reputationLabel.textContent = parsedData.reputation || 0;
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (username) {
      fetchUserDetails(username);
    } else {
      alert("Please enter a valid username");
    }
  });
});
