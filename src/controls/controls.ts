import { ToolManager, ToolEvents } from "../tools/ToolManager";

type ControlsOptions = {
  toolManager: ToolManager;
};

export class Controls {
  private _toolManger: ToolManager;
  private _toolDisplayDiv: HTMLDivElement;

  constructor(options: ControlsOptions) {
    this._toolManger = options.toolManager;
    const controlsDiv = document.createElement("div");
    controlsDiv.style.position = "absolute";
    controlsDiv.style.top = "0";
    controlsDiv.style.left = "75%";
    controlsDiv.style.width = "25%";
    controlsDiv.style.height = "100%";
    controlsDiv.style.backgroundColor = "#333";
    controlsDiv.style.color = "#fff";
    controlsDiv.style.padding = "10px";
    controlsDiv.innerHTML = "<h2>Controls</h2>";
    document.body.appendChild(controlsDiv);

    this._toolDisplayDiv = document.createElement("div");
    this._toolDisplayDiv.style.marginTop = "20px";
    this._toolDisplayDiv.innerHTML = `<p>Active Tool: ${this._toolManger.activeToolName}</p>`;
    controlsDiv.appendChild(this._toolDisplayDiv);

    window.addEventListener(ToolEvents.ToolChanged, () => {
      this.updateActiveToolDisplay();
    });
  }

  private updateActiveToolDisplay() {
    this._toolDisplayDiv.innerHTML = `<p>Active Tool: ${this._toolManger.activeToolName}</p>`;
  }
}
