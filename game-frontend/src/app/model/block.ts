export enum BlockKind {
  House = '/assets/house.svg',
  WindTurbine = '/assets/wind-turbine.svg',
  Circus = '/assets/circus.svg',
  Fountain = '/assets/fountain.svg',
}

export class Block {
  kind: BlockKind;
  radius: number;
  constructor(kind: BlockKind) {
    if (kind === BlockKind.Circus) {
      this.radius = 3;
    } else {
      this.radius = 1;
    }

    this.kind = kind;
  }
}
