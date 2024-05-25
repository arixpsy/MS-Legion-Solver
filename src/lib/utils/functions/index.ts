import { ShapeType } from '$lib/types'

export function initPieceCount(): Record<ShapeType, number> {
	return {
		[ShapeType.Lv60]: 0,
		[ShapeType.Lv100]: 0,
		[ShapeType.Lv140ArcherMageThief]: 0,
		[ShapeType.Lv140PirateWarrior]: 0,
		[ShapeType.Lv200Archer]: 0,
		[ShapeType.Lv200Mage]: 0,
		[ShapeType.Lv200Pirate]: 0,
		[ShapeType.Lv200Thief]: 0,
		[ShapeType.Lv200Warrior]: 0,
		[ShapeType.Lv250Archer]: 0,
		[ShapeType.Lv250Mage]: 0,
		[ShapeType.Lv250Pirate]: 0,
		[ShapeType.Lv250Thief]: 0,
		[ShapeType.Lv250Warrior]: 0,
		[ShapeType.Lv250Xenon]: 0
	}
}

export function getPieceColor(shape: ShapeType): string {
	if (shape === 'Lv200Warrior' || shape === 'Lv250Warrior') return '#CC0000'
	if (shape === 'Lv200Mage' || shape === 'Lv250Mage') return '#33BBCC'
	if (shape === 'Lv200Archer' || shape === 'Lv250Archer') return '#99CC55'
	if (shape === 'Lv200Thief' || shape === 'Lv250Thief') return '#9966DD'
	if (shape === 'Lv200Pirate' || shape === 'Lv250Pirate') return '#999999'
	if (shape === 'Lv250Xenon') return '#6600CC'
	if (shape === 'Lv140ArcherMageThief') return '#FFCC99'
	if (shape === 'Lv140PirateWarrior') return '#CC3366'
	if (shape === 'Lv100') return '#FFCC00'
	return '#EE8800'
}
