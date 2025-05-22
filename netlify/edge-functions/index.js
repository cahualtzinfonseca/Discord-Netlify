import {
	InteractionResponseType,
	InteractionType,
	verifyKey,
} from "https://esm.sh/discord-interactions@3.4.0";

const INVITE_COMMAND = {
	name: "Invite",
	description: "Get an invite link to add the bot to your server",
};
 
const HELP_COMMAND = {
	name: "Help",
	description: "Get a list of commands available.",
};

export default async (request, context) => {
	if (request.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const signature = request.headers.get("x-signature-ed25519");
		const timestamp = request.headers.get("x-signature-timestamp");
		const rawBody = await request.text();

		const isValidRequest = verifyKey(
			rawBody,
			signature,
			timestamp,
			Deno.env.get("PUBLIC_KEY"),
		);

		if (!isValidRequest) {
			console.error("Invalid Request");
			return new Response(
				JSON.stringify({ error: "Bad request signature" }),
				{
					status: 401,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const message = JSON.parse(rawBody);
		const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${Deno.env.get("APPLICATION_ID")}&scope=applications.commands`;

		if (message.type === InteractionType.PING) {
			console.log("Handling Ping request");
			return new Response(
				JSON.stringify({
					type: InteractionResponseType.PONG,
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				}
			);
		} else if (message.type === InteractionType.APPLICATION_COMMAND) {
			switch (message.data.name.toLowerCase()) {
				case HELP_COMMAND.name.toLowerCase():
					console.log("Help Request");
					return new Response(
						JSON.stringify({
							type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
							data: {
								content: "Hello!",
							},
						}),
						{
							status: 200,
							headers: { "Content-Type": "application/json" },
						}
					);

				case INVITE_COMMAND.name.toLowerCase():
					console.log("Invite Request");
					return new Response(
						JSON.stringify({
							type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
							data: {
								content: INVITE_URL,
								flags: 64,
							},
						}),
						{
							status: 200,
							headers: { "Content-Type": "application/json" },
						}
					);

				default:
					console.error("Unknown Command");
					return new Response(
						JSON.stringify({ error: "Unknown Command" }),
						{
							status: 400,
							headers: { "Content-Type": "application/json" },
						}
					);
			}
		} else {
			console.error("Unknown Interaction Type");
			return new Response(
				JSON.stringify({ error: "Unknown Type" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response(
			JSON.stringify({ error: "Internal server error" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
};
