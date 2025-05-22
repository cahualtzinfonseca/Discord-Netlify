import {
	InteractionResponseType,
	InteractionType,
	verifyKey,
} from "https://esm.sh/discord-interactions@3.4.0";

export const HELP_COMMAND = {
	name: "help",
	type: ApplicationCommandType.ChatInput,
	description: "Get a list of commands available.",
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};

export const INVITE_COMMAND = {
	name: "invite",
	type: ApplicationCommandType.ChatInput,
	description: "Get an invite link to add the bot to your server.",
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};

export const INFO_COMMAND = {
	name: "info",
	type: ApplicationCommandType.ChatInput,
	description: "Get an Information about this bot.",
	contexts: [
		InteractionContextType.Guild,
		InteractionContextType.BotDM,
		InteractionContextType.PrivateChannel,
	],
	integration_types: [
		ApplicationIntegrationType.GuildInstall,
		ApplicationIntegrationType.UserInstall,
	],
};
