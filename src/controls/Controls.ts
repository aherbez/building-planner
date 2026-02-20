import { ToolManager, ToolEvents } from "../tools/ToolManager";
import { SceneManager } from "../SceneManager";

class PerformanceDisplay {
  private _fpsEntries: number[] = [];
  private MAX_FPS_ENTRIES = 60;

  private _displayDiv: HTMLDivElement;
  private _fpsDiv: HTMLDivElement;

  constructor() {
    const perfDiv = document.createElement("div");
    perfDiv.style.position = "absolute";
    perfDiv.style.bottom = "20px";
    perfDiv.style.left = "10px";
    perfDiv.style.padding = "5px 10px";
    perfDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    perfDiv.style.color = "#fff";
    perfDiv.style.fontFamily = "monospace";
    perfDiv.style.fontSize = "14px";
    this._displayDiv = perfDiv;
    this._displayDiv.innerHTML = "<h2>Performance</h2>";

    this._fpsDiv = document.createElement("div");
    this._displayDiv.appendChild(this._fpsDiv);
  }

  public addToDisplay(parent: HTMLDivElement) {
    parent.appendChild(this._displayDiv);
  }

  public updatePerformanceDisplay(fps: number) {
    this._fpsEntries.push(fps);
    if (this._fpsEntries.length > this.MAX_FPS_ENTRIES) {
      this._fpsEntries.shift();
    }
    const averageFps =
      this._fpsEntries.reduce((sum, entry) => sum + entry, 0) /
      this._fpsEntries.length;
    this._fpsDiv.innerHTML = `<p>FPS: ${averageFps.toFixed(2)}</p>`;
  }
}

export class Controls {
  private _toolDisplayDiv: HTMLDivElement;
  private _toolInstructionsDiv: HTMLDivElement;
  private _performanceDisplayDiv: PerformanceDisplay;

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
    controlsDiv.innerHTML = "<h2>Controls</h2>";
    document.body.appendChild(controlsDiv);

    this._toolDisplayDiv = document.createElement("div");
    this._toolDisplayDiv.style.marginTop = "20px";
    this._toolDisplayDiv.innerHTML = `<p>Active Tool: ${SceneManager.toolManager.activeToolName}</p>`;
    controlsDiv.appendChild(this._toolDisplayDiv);

    this._toolInstructionsDiv = document.createElement("div");
    this._toolInstructionsDiv.style.padding = "5px";
    this._toolInstructionsDiv.style.marginTop = "20px";
    controlsDiv.appendChild(this._toolInstructionsDiv);

    this._performanceDisplayDiv = new PerformanceDisplay();
    this._performanceDisplayDiv.addToDisplay(controlsDiv);

    this.updateActiveToolDisplay();
    this.updateToolInstructions();

    window.addEventListener(ToolEvents.ToolChanged, () => {
      this.updateActiveToolDisplay();
      this.updateToolInstructions();
    });
  }

  public updatePerformanceDisplay(fps: number) {
    this._performanceDisplayDiv.updatePerformanceDisplay(fps);
  }

  private updateActiveToolDisplay() {
    this._toolDisplayDiv.innerHTML = `<p>Active Tool: ${SceneManager.toolManager.activeToolName}</p>`;
  }

  private updateToolInstructions() {
    const instructions =
      SceneManager.toolManager.activeTool?.instructions || [];
    if (instructions.length === 0) {
      this._toolInstructionsDiv.innerHTML = "";
    } else {
      this._toolInstructionsDiv.innerHTML =
        "<p>Instructions:</p>" +
        instructions.map((inst) => `<p>${inst}</p>`).join("");
    }
  }
}
