import "../scss/imports.scss";
import Axios from "axios";

//Window Load Function
window.addEventListener("load", () => {
  const spinner = document.querySelector("#spinner");
  const cardData = document.querySelector("#data");

  function outputData(outputdata) {
    console.log(outputdata);
    cardData.innerHTML = `${outputdata.id} ${outputdata.name} ${outputdata.telephone} ${outputdata.email} ${outputdata.status} ${outputdata.course_title ? outputdata.course_title : "No Course's"}`;
  }

  // Function Random - give us a randomw item from the API array of data
  function randomDataItem(data) {
    const random = Math.floor(Math.random() * data.length);
    outputData(data[random]);
  }

  // Async Function to Fetch Data from API
  async function fetchData() {
    // Creating the Spinner Element - to show when waiting for the API call to complete
    const image = document.createElement("img");
    image.src = "./images/spinner.gif";
    spinner.appendChild(image);

    // Try Block - API Call, Remove Spinner, Pass API Data into "randomDataItem" Function
    try {
      const response = await Axios("http://leads.beta.openstudycollege.info/getTopLeads");
      const data = response.data;
      spinner.removeChild(image);
      randomDataItem(data);
      cardData.classList.add("data--visible");
    } catch (e) {
      console.log("ERROR - There was a error fetching the data");
    }
  }

  // Call FetchData Function
  fetchData();
});
