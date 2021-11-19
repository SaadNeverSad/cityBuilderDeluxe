export enum BlockKind {
  House = 'assets/house.svg',
  WindTurbine = 'assets/wind-turbine.svg',
  Circus = 'assets/circus.svg',
  Fountain = 'assets/fountain.svg',
}

export class Block {
  kind: BlockKind;
  constructor(kind: BlockKind) {
    this.kind = kind;
  }
}
