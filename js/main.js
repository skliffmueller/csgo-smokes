var tabs = [{
    id:"de_nuke",
    name:"Nuke",
    smokes:[{
        id:"de_nuke_outside_garage",
        name:"Outside Garage",
        description:"Jump throw",
        thumbnail:"./img/guy-smart-phone.jpg",
        modalDescription:"Jump throw",
        screens:['./img/portfolio-item-008.jpg','./img/guy-smart-phone.jpg']
    },{
        id:"de_nuke_outside_secret",
        name:"Outside Secret",
        description:"Stand throw",
        thumbnail:"./img/guy-laptop.jpg",
        modalDescription:"Stand throw",
        screens:['./img/portfolio-item-008.jpg','./img/guy-smart-phone.jpg']
    },{
        id:"de_nuke_outside_ct_boxes",
        name:"Outside CT Boxes",
        description:"Stand throw",
        thumbnail:"./img/kitten.jpg",
        modalDescription:"Stand throw",
        screens:['./img/portfolio-item-008.jpg','./img/guy-smart-phone.jpg']
    },{
        id:"de_nuke_outside_cross_1",
        name:"Outside Cross 1",
        description:"Stand throw",
        thumbnail:"./img/portfolio-item-011.jpg",
        modalDescription:"Stand throw",
        screens:['./img/portfolio-item-008.jpg','./img/guy-smart-phone.jpg']
    },{
        id:"de_nuke_outside_cross_2",
        name:"Outside Cross 2",
        description:"Stand throw",
        thumbnail:"./img/river-bank.jpg",
        modalDescription:"Stand throw",
        screens:['./img/portfolio-item-008.jpg','./img/guy-smart-phone.jpg']
    }],
    flashes:[],
    molotovs:[]
}];


(function() {
    var mapNav = document.getElementById('map_nav');
    var utilityNav = document.getElementById('utility_nav');
    var card = document.getElementById('card').cloneNode(true);
    var modal = document.getElementById('modal').cloneNode(true);

    document.getElementById('card').parentElement.removeChild(document.getElementById('card'));
    document.getElementById('modal').parentElement.removeChild(document.getElementById('modal'));

    var container = document.getElementById('map_container').cloneNode(true);

    document.getElementById('map_container').parentElement.removeChild(document.getElementById('map_container'));

    var linkOnClick = function(event) {
        event.preventDefault();
        tabs.forEach(function(t) {
            document.getElementById(t.id+'_nav_link').classList.remove('active');
            document.getElementById(t.id+'_content').classList.add('hidden');
        });
        document.getElementById(event.target.dataset.tabid+'_nav_link').classList.add('active');
        document.getElementById(event.target.dataset.tabid+'_content').classList.remove('hidden');
    };
    var utilityOnClick = function(event) {
        event.preventDefault();
        document.getElementsByClassName('utility_link').forEach(function(link) {
            link.classList.remove('active');
        })
        event.target.classList.add('active');
    }
    var utilityTabs = ['Smokes', 'Molotovs', 'Flashes']
    utilityTabs.forEach(function(utility) {
        var link = document.createElement('a');
        link.classList.add('nav-link');
        link.classList.add('utility_link');
        link.onclick = utilityOnClick;
        link.innerHTML = utility;
        link.dataset.utilityid = utility.toLowerCase();
        utilityNav.appendChild(link);
    });
    tabs.forEach(function(tab) {
        var link = document.createElement('a');
        link.classList.add('nav-link');
        link.onclick = linkOnClick;
        link.innerHTML = tab.name;
        link.dataset.tabid = tab.id;
        mapNav.appendChild(link);

        var tabContainer = container.cloneNode(true);
        var row = document.createElement('div');
        row.classList.add('row');
        tab.smokes.forEach(function(smoke) {
            var col = document.createElement('div');
            col.classList.add('col-md-3');
            var smokeCard = card.cloneNode(true);
            var smokeModal = modal.cloneNode(true);

            var thumb = smokeCard.querySelector('.card-img-top');
            var title = smokeCard.querySelector('.card-title');
            var description = smokeCard.querySelector('.card-text');

            thumb.src = smoke.thumbnail;
            title.innerHTML = smoke.name;
            description.innerHTML = smoke.description;

            var modalTitle = smokeModal.querySelector('.modal-title');
            var modalBody = smokeModal.querySelector('.modal-body');

            modalTitle.innerHTML = smoke.name;

            var pDescription = document.createElement('p');
            pDescription.innerHTML = smoke.modalDescription;

            modalBody.appendChild(pDescription);

            smoke.screens.forEach(function(image) {
                var img = document.createElement('img');
                img.src = image;
                modalBody.appendChild(img);
            });
            $(smokeModal).modal({
                show: false
            });
            smokeCard.onclick = function() {
                $(smokeModal).modal('show');
            };
            col.appendChild(smokeCard);
            col.appendChild(smokeModal);
            row.appendChild(col);
        });
        tabContainer.appendChild(row);
        document.body.appendChild(tabContainer);
    });
})()