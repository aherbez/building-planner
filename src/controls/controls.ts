export class Controls {
  constructor() {
    const controlsDiv = document.createElement("div");
    controlsDiv.style.position = "absolute";
    controlsDiv.style.top = "0";
    controlsDiv.style.left = "75%";
    controlsDiv.style.width = "25%";
    controlsDiv.style.height = "100%";
    controlsDiv.style.backgroundColor = "#333";
    controlsDiv.style.color = "#fff";
    controlsDiv.style.padding = "10px";
    controlsDiv.innerHTML =
      "<h2>Controls</h2><p>Tool buttons will go here.</p>";
    document.body.appendChild(controlsDiv);
  }
}
