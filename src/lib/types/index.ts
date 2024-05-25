export const ShapeType = {
	Lv60: 'Lv60',
	Lv100: 'Lv100',
	Lv140ArcherMageThief: 'Lv140ArcherMageThief',
	Lv140PirateWarrior: 'Lv140PirateWarrior',
	Lv200Archer: 'Lv200Archer',
	Lv200Mage: 'Lv200Mage',
	Lv200Pirate: 'Lv200Pirate',
	Lv200Thief: 'Lv200Thief',
	Lv200Warrior: 'Lv200Warrior',
	Lv250Archer: 'Lv250Archer',
	Lv250Mage: 'Lv250Mage',
	Lv250Pirate: 'Lv250Pirate',
	Lv250Thief: 'Lv250Thief',
	Lv250Warrior: 'Lv250Warrior',
	Lv250Xenon: 'Lv250Xenon'
} as const

export type ShapeType = (typeof ShapeType)[keyof typeof ShapeType]

export const BlockType = {
	Empty: 0,
	Root: 1,
	Edge: 2
} as const

export type BlockType = (typeof BlockType)[keyof typeof BlockType]
