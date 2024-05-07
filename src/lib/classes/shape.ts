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
	LV250Archer: 'LV250Archer',
	Lv250Mage: 'Lv250Mage',
	Lv250Pirate: 'Lv250Pirate',
	Lv250Thief: 'Lv250Thief',
	Lv250Warrior: 'Lv250Warrior',
	Lv250Xenon: 'Lv250Xenon'
} as const

type ShapeType = (typeof ShapeType)[keyof typeof ShapeType]

export const BlockType = {
	Empty: 0,
	Root: 1,
	Edge: 2
} as const

type BlockType = (typeof BlockType)[keyof typeof BlockType]

export class Shape {
	static Lv60 = [[2]]
	static Lv100 = [[2, 1]]
	static Lv140ArcherMageThief = [[1, 2, 1]]
	static Lv140PirateWarrior = [
		[2, 1],
		[1, 0]
	]
	static Lv200Archer = [[1, 2, 1, 1]]
	static Lv200Mage = [
		[1, 2, 1],
		[0, 1, 0]
	]
	static Lv200Pirate = [
		[1, 2, 0],
		[0, 1, 1]
	]
	static Lv200Thief = [
		[1, 2, 1],
		[0, 0, 1]
	]
	static Lv200Warrior = [
		[2, 1],
		[1, 1]
	]
	static LV250Archer = [[1, 1, 2, 1, 1]]
	static Lv250Mage = [
		[0, 1, 0],
		[1, 2, 1],
		[0, 1, 0]
	]
	static Lv250Pirate = [
		[1, 2, 0, 0],
		[0, 1, 1, 1]
	]
	static Lv250Thief = [
		[0, 0, 1],
		[1, 2, 1],
		[0, 0, 1]
	]
	static Lv250Warrior = [
		[2, 1, 1],
		[1, 1, 0]
	]
	static Lv250Xenon = [
		[1, 0, 0],
		[1, 2, 1],
		[0, 0, 1]
	]

	shapeType: ShapeType
	layout: Array<Array<number>>
	blockCount: number

	constructor(shapeType: ShapeType) {
		this.shapeType = shapeType
		this.layout = Shape[shapeType]
		let blockCount = 0
		for (let i = 0; i < this.layout.length; ++i) {
			for (let j = 0; j < this.layout[i].length; ++j) {
				if (this.layout[i][j] > 0) {
					blockCount++
				}
			}
		}
		this.blockCount = blockCount
	}
}
