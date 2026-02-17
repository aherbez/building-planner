class MaterialPanel {
  constructor() {
    const panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.top = "0";
    panel.style.left = "0";
    panel.style.width = "200px";
    panel.style.height = "100%";
    panel.style.backgroundColor = "#222";
    panel.style.color = "#fff";
    panel.style.padding = "10px";
    panel.innerHTML = "<h2>Materials</h2><p>(coming soon)</p>";
    document.body.appendChild(panel);
  }
}
