import { ToolManager, ToolEvents } from "../tools/ToolManager";

type ControlsOptions = {
  toolManager: ToolManager;
};

export class Controls {
  private _toolManger: ToolManager;
  private _toolDisplayDiv: HTMLDivElement;
  private _toolInstructionsDiv: HTMLDivElement;

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

    this._toolInstructionsDiv = document.createElement("div");
    this._toolInstructionsDiv.style.padding = "5px";
    this._toolInstructionsDiv.style.marginTop = "20px";

    controlsDiv.appendChild(this._toolInstructionsDiv);

    this.updateActiveToolDisplay();
    this.updateToolInstructions();

    window.addEventListener(ToolEvents.ToolChanged, () => {
      this.updateActiveToolDisplay();
      this.updateToolInstructions();
    });
  }

  private updateActiveToolDisplay() {
    this._toolDisplayDiv.innerHTML = `<p>Active Tool: ${this._toolManger.activeToolName}</p>`;
  }

  private updateToolInstructions() {
    const instructions = this._toolManger.activeTool?.instructions || [];
    if (instructions.length === 0) {
      this._toolInstructionsDiv.innerHTML = "";
    } else {
      this._toolInstructionsDiv.innerHTML =
        "<p>Instructions:</p>" +
        instructions.map((inst) => `<p>${inst}</p>`).join("");
    }
  }
}
