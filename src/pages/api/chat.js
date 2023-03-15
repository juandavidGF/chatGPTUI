import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function(req, res) {
	try {
		const completion = await openai.createChatCompletion({
			// model: "gpt-4",
			model: "gpt-3.5-turbo",
			messages: [{ "role": "system", "content": "You are a helpful assistant." }].concat(req.body.messages)
	
		});
		// console.log(completion, 'completation');
		res.status(200).json({ result: completion.data.choices[0].message });
	} catch (error) {
		console.log('api/chat#error', error);
		res.status(500).json({ error: error.message });
	}
}