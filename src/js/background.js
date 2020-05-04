import extensionizer from "extensionizer";

let Url;

extensionizer.extension.onMessage.addListener(request => {
	Url = request.Link;

	switch (request.Type) {
		case "media":
			extensionizer.storage.local.get(
				{
					showDialog: false,
				},
				items => {
					extensionizer.contextMenus.removeAll();
					extensionizer.contextMenus.create({
						id: "menu",
						enabled: true,
						title: items.showDialog ? "Save as..." : "Save",
						contexts: ["all"],
						documentUrlPatterns: ["*://*.instagram.com/*"],
					});
				}
			);
			break;

		default:
			extensionizer.contextMenus.removeAll();
			break;
	}
});

extensionizer.contextMenus.onClicked.addListener(() => {
	extensionizer.storage.local.get(
		{
			showDialog: false,
		},
		items => {
			extensionizer.downloads.download({
				url: Url,
				saveAs: items.showDialog,
			});
		}
	);
});
