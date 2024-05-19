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
		[ShapeType.LV250Archer]: 0,
		[ShapeType.Lv250Mage]: 0,
		[ShapeType.Lv250Pirate]: 0,
		[ShapeType.Lv250Thief]: 0,
		[ShapeType.Lv250Warrior]: 0,
		[ShapeType.Lv250Xenon]: 0
	}
}
