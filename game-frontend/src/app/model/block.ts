export enum BlockKind {
  House = 'house',
  WindTurbine = 'wind-turbine',
  Circus = 'circus',
  Fountain = 'fountain',
}

export class Block {
  kind: BlockKind;
  radius: number;
  constructor(kind: BlockKind) {
    this.kind = kind;

    if (this.kind === BlockKind.Circus) {
      this.radius = 3;
    } else {
      this.radius = 1;
    }
  }

  static assetPath(blockKind: BlockKind | string): string {
    let kind: BlockKind;
    if (typeof blockKind === 'string') {
      kind = blockKind as BlockKind;
    } else {
      kind = blockKind;
    }

    return '/assets/' + blockKind + '.svg';
  }
}
