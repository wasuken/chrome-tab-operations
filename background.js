chrome.contextMenus.create({
	id: "cut",
    title: "現在のタブを含むタブから右のタブすべてを切り取って新しいウインドウを作成する"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == "cut") {
		let tab_result = 0
		let url_lst = []
		let flg = true;
		for(let i = tab.index; tab_result != undefined && i < 100 && flg; i++){
			chrome.tabs.query({index: i}, function(t_lst){
				if(t_lst.length <= 0){
					flg = !flg;
				}else{
					url_lst.push(t_lst[0]);
				}

			});
		}
		chrome.windows.create({state: "fullscreen"}, function(w){
			chrome.tabs.move(url_lst.map(x => x.id), {windowId: w.id, index: -1}, function(t){});
		});
    }
});
