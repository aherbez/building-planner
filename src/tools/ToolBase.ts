export enum Tools {
  None,
  Slab,
}

export class ToolBase {
  public readonly kind: Tools = Tools.None;

  constructor() {}

  activate() {}

  deactivate() {}

  onPointerDown(event: PointerEvent) {}

  onPointerUp(event: PointerEvent) {}

  onPointerMove(event: PointerEvent) {}
}
