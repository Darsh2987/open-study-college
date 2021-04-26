import "../scss/imports.scss";
import Axios from "axios";

window.addEventListener("load", () => {
  const spinner = document.querySelector("#spinner");
  const cardData = document.querySelector("#data");

  function outputData(outputdata) {
    console.log(outputdata);
    cardData.innerHTML = `${outputdata.id} ${outputdata.name} ${outputdata.telephone} ${outputdata.email} ${outputdata.status} ${outputdata.course_title ? outputdata.course_title : "No Course's"}`;
  }

  function randomDataItem(data) {
    const random = Math.floor(Math.random() * data.length);
    outputData(data[random]);
  }

  async function fetchData() {
    const image = document.createElement("img");
    image.src = "./images/spinner.gif";
    spinner.appendChild(image);

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

  fetchData();
});
