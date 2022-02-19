const professionMock = require("../mock/professions.json")
const qualityMock = require("../mock/qualities.json")
const Quality = require("../models/Quality")
const Profession = require("../models/Profession")

module.exports = async function () {
	const professionsList =  await Profession.find()
	if (professionsList.length !== professionMock.length) {
		await createInitialEntity(Profession, professionMock)
	}
	const qualitiesList = await Quality.find()
	if (qualitiesList.length !== qualityMock.length) {
		await createInitialEntity(Quality, qualityMock)
	}
}

async function createInitialEntity(Model, data) {
	await Model.collection.drop()
	return Promise.all(
		data.map(async (item) => {
			try {
				delete item._id
				const newItem = new Model(item)
				await newItem.save()
				return newItem
			} catch (err) {
				return e
			}
		})
	)
}