import { hflip, rotate90, rotate180, rotate270 } from '2d-array-rotation'
import { BlockType, ShapeType } from '$lib/types'

export default class Shape {
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
	static Lv250Archer = [[1, 1, 2, 1, 1]]
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
	layout: Array<Array<BlockType>>
	rotation: number
	isFlipped: boolean
	blockCount: number

	constructor(shapeType: ShapeType, rotation = 0, isFlipped = false) {
		this.shapeType = shapeType

		switch (rotation) {
			case 270:
				this.layout = rotate270(Shape[shapeType]) as Array<Array<BlockType>>
				break
			case 180:
				this.layout = rotate180(Shape[shapeType]) as Array<Array<BlockType>>
				break
			case 90:
				this.layout = rotate90(Shape[shapeType]) as Array<Array<BlockType>>
				break
			default:
				this.layout = Shape[shapeType] as Array<Array<BlockType>>
		}

		this.rotation = rotation
		this.isFlipped = isFlipped
		if (isFlipped) {
			this.layout = hflip(this.layout)
		}

		let blockCount = 0
		for (let row = 0; row < this.layout.length; row++) {
			for (let col = 0; col < this.layout[row].length; col++) {
				if (this.layout[row][col] > 0) {
					blockCount++
				}
			}
		}
		this.blockCount = blockCount
	}

	canFlip() {
		if (this.shapeType === ShapeType.Lv200Pirate) return true
		if (this.shapeType === ShapeType.Lv200Thief) return true
		if (this.shapeType === ShapeType.Lv250Pirate) return true
		if (this.shapeType === ShapeType.Lv250Warrior) return true
		if (this.shapeType === ShapeType.Lv250Xenon) return true
		return false
	}

	canRotate() {
		if (this.shapeType === ShapeType.Lv60) return false
		if (this.shapeType === ShapeType.Lv250Mage) return false
		return true
	}
}
