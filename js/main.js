function build(tabs) {


    var mapNav = document.getElementById('map_nav');
    var utilityNav = document.getElementById('utility_nav');
    var card = document.getElementById('card').cloneNode(true);
    var modal = document.getElementById('modal').cloneNode(true);

    document.getElementById('card').parentElement.removeChild(document.getElementById('card'));
    document.getElementById('modal').parentElement.removeChild(document.getElementById('modal'));

    var container = document.getElementById('map_container').cloneNode(true);

    document.getElementById('map_container').parentElement.removeChild(document.getElementById('map_container'));

    var subtabOnClick = function(activeLink) {
        return function(event) {
            event.preventDefault();
            var navLinks = document.getElementsByClassName('nav-link');
            for(var i=0;i<navLinks.length;i++) {
                navLinks[i].classList.remove('active');
            }
            activeLink.classList.add('active');

            var tabContainers = document.getElementsByClassName('tab-container');
            for(var i=0;i<tabContainers.length;i++) {
                tabContainers[i].hidden = true;
            }
            document.getElementById(event.target.dataset.subtabid + '_content').hidden = false;
        };
    };
    tabs.forEach(function(tab, i) {
        var navTab = document.createElement('li');
        navTab.classList.add('nav-item');

        var navMainLink = document.createElement('a');
        navMainLink.classList.add('nav-link');
        navMainLink.classList.add('dropdown-toggle');
        if(i === 0) {
            navMainLink.classList.add('active');
        }
        navMainLink.dataset.toggle = "dropdown";
        navMainLink.dataset.tabid = tab.id;
        navMainLink.href = "#";
        navMainLink.innerHTML = tab.name;

        navTab.appendChild(navMainLink);

        var navDropdown = document.createElement('div');
        navDropdown.classList.add('dropdown-menu');

        tab.subtabs.forEach(function(subtab) {
            var sublink = document.createElement('a');
            sublink.classList.add('dropdown-item');
            sublink.href = "#";
            sublink.dataset.subtabid = subtab.id;
            sublink.onclick = subtabOnClick(navMainLink);
            sublink.innerHTML = subtab.name;

            navDropdown.appendChild(sublink);

            var tabContainer = container.cloneNode(true);
            tabContainer.id = subtab.id + '_content';
            tabContainer.classList.add('tab-container');

            var tabTitle = document.createElement('h4');
            tabTitle.innerHTML = tab.name + ' ' + subtab.name;

            tabContainer.appendChild(tabTitle);

            var row = document.createElement('div');
            row.classList.add('row');

            subtab.tiles.forEach(function(tile) {
                var tileCard = card.cloneNode(true);
                var tileModal = modal.cloneNode(true);

                var thumb = tileCard.querySelector('.card-img-top');
                var title = tileCard.querySelector('.card-title');
                var description = tileCard.querySelector('.card-text');

                thumb.src = tile.thumbnail;
                title.innerHTML = tile.name;
                description.innerHTML = tile.description;

                var modalTitle = tileModal.querySelector('.modal-title');
                var modalBody = tileModal.querySelector('.modal-body');

                modalTitle.innerHTML = tile.name;

                var pDescription = document.createElement('p');
                pDescription.innerHTML = tile.modalDescription;

                modalBody.appendChild(pDescription);

                tile.screens.forEach(function(image) {
                    var img = document.createElement('img');
                    img.classList.add('modal-img')
                    img.src = image;
                    modalBody.appendChild(img);
                });
                $(tileModal).modal({
                    show: false
                });
                tileCard.onclick = function() {
                    $(tileModal).modal('show');
                };

                document.body.appendChild(tileModal);
                row.appendChild(tileCard);
            });

            tabContainer.appendChild(row);
            document.body.appendChild(tabContainer);
        });

        navTab.appendChild(navDropdown);
        mapNav.appendChild(navTab);
    });
    var tabContainers = document.getElementsByClassName('tab-container');
    for(var i=0;i<tabContainers.length;i++) {
        if(i!==0) {
            tabContainers[i].hidden = true;
        }
    }

}

(function() {
    build(window.tabs);
})()