webpackJsonp([3],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_wordpress_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GalleryPage = (function () {
    function GalleryPage(navCtrl, navParams, wordpressService, viewCtrl, loadingCtrl, transfer, f, platform, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.f = f;
        this.platform = platform;
        this.fb = fb;
        this.morePagesAvailable = true;
        this.photos = [];
        this.post = { title: '',
            content: '',
            featuredimg: '',
            imgid: '',
            action: '' };
        this.loading = false;
        this.createForm();
    }
    GalleryPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({});
        if (this.photos.length == 0) {
            loading.present();
        }
        this.wordpressService.getImageWordpress().subscribe(function (data) {
            _this.photos = data;
            loading.dismiss();
            console.log(_this.photos);
        }, function (err) {
            console.log(err);
        });
    };
    GalleryPage.prototype.selecetimg = function (imgid, urlimg) {
        if (this.wordpressService.imginstat == false) {
            this.wordpressService.imgidforgallery = imgid;
            this.wordpressService.urlimgforgallery = urlimg;
        }
        else {
            this.wordpressService.imgins = urlimg;
        }
        this.navCtrl.pop();
    };
    GalleryPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        var page = (Math.ceil(this.photos.length / 10)) + 1;
        var loading = true;
        this.wordpressService.getImageWordpress(page)
            .subscribe(function (data) {
            console.log(data);
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var photo = data_1[_i];
                if (!loading) {
                    infiniteScroll.complete();
                }
                _this.photos.push(photo);
                loading = false;
            }
        }, function (err) {
            _this.morePagesAvailable = false;
        });
    };
    GalleryPage.prototype.createForm = function () {
        this.form = this.fb.group({
            avatar: null
        });
    };
    GalleryPage.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            console.log(file);
            this.filename = file.name;
            document.getElementById('choose').innerHTML = this.filename;
            this.form.get('avatar').setValue(file);
        }
    };
    GalleryPage.prototype.prepareSave = function () {
        var input = new FormData();
        input.append('avatar', this.form.get('avatar').value);
        return input;
    };
    GalleryPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Uploading...'
        });
        var formModel = this.prepareSave();
        console.log(formModel);
        // FormData cannot be inspected (see "Key difference"), hence no need to log it here
        loading.present({});
        // In a real-world app you'd have a http request / service call here like
        // this.http.post('apiUrl', formModel)
        var _a = this.filename.split('.'), file = _a[0], extension = _a[1];
        console.log(file);
        this.wordpressService.uploadimg(this.form.get('avatar').value, file).subscribe(function (data) {
            console.log(data);
            loading.dismiss();
            _this.ionViewWillEnter();
        });
    };
    GalleryPage.prototype.clearFile = function () {
        this.form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    };
    return GalleryPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('fileInput'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], GalleryPage.prototype, "fileInput", void 0);
GalleryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-gallery',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\gallery\gallery.html"*/'<ion-header>\n\n  <ion-navbar color = "primary">\n    <ion-title> Select Image </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n<form [formGroup]="form">\n<ion-grid>\n\n  <ion-row>\n\n    <ion-col no-padding >\n\n\n   \n\n      <label ion-button clear for="avatar" id="choose"> Choose File</label>\n    \n    <input  type="file" id="avatar"  (change)="onFileChange($event)" #fileInput>\n   \n  \n\n\n\n    </ion-col>\n    <ion-col text-right>\n            <button (click)="onSubmit()" ion-button>Upload </button>\n    </ion-col>   \n  </ion-row>\n</ion-grid>\n</form>\n\n<div class="images" >\n  <div class="one-image" *ngFor="let photo of photos">\n    <img  src={{photo.source_url}} (click)="selecetimg(photo.id,photo.source_url )" >\n  </div>\n</div>\n\n\n<ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="doInfinite($event)">\n    \n    <ion-infinite-scroll-content\n    loadingSpinner="bubbles"\n    loadingText="Loading more posts ...">\n    </ion-infinite-scroll-content>\n  \n</ion-infinite-scroll>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\gallery\gallery.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["b" /* FileTransferObject */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__services_wordpress_service__["a" /* WordpressService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], GalleryPage);

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/createpost/createpost.module": [
		288,
		2
	],
	"../pages/gallery/gallery.module": [
		287,
		1
	],
	"../pages/popover/popover.module": [
		286,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createpost_createpost__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popover_popover__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegisterPage = (function () {
    function RegisterPage(viewCtrl, alertCtrl, navCtrl, navParams, loadingCtrl, wordpressService, authenticationService, iab) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
        this.iab = iab;
        this.posts = this.wordpressService.posts;
    }
    RegisterPage.prototype.ionViewWillLoad = function () {
    };
    RegisterPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    RegisterPage.prototype.iap = function () {
        // let postid = this.wordpressService.postid;   
        // const options : InAppBrowserOptions = {
        //       zoom: 'no',
        //       fullscreen: 'yes',
        //       toolbar: 'no',
        //       location : 'no'
        //     }
        //     const browser = this.iab.create('https://www.sammysautosalesnc.com/wp-admin/post.php?post='+postid+'&action=edit  ' , '_self' , options);
        //     browser.insertCSS({code:"body{background-color:red !important;}"});
        this.wordpressService.iframe = false;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__popover_popover__["a" /* PopoverPage */], { action: 'Update' });
    };
    RegisterPage.prototype.updatePost = function () {
        var postid = this.wordpressService.postid;
        var posttitle = this.wordpressService.title;
        var postcontent = this.wordpressService.content;
        var index = this.wordpressService.index;
        var post = this.wordpressService.post;
        if (this.posts[index]._embedded['wp:featuredmedia']) {
            this.wordpressService.urlimgforgallery = this.posts[index]._embedded['wp:featuredmedia'][0].source_url;
        }
        this.wordpressService.action = "Update Post";
        this.wordpressService.title = posttitle;
        this.wordpressService.content = postcontent.replace('</p>', '');
        this.wordpressService.content = this.wordpressService.content.replace('<p>', '');
        this.wordpressService.index = index;
        this.wordpressService.posts = this.posts;
        this.wordpressService.imgidforgallery = this.posts[index].featured_media;
        this.wordpressService.postid = postid;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__createpost_createpost__["a" /* CreatepostPage */], {
            id: postid,
            title: posttitle,
            content: postcontent,
            posts: this.posts
        });
    };
    RegisterPage.prototype.deletePost = function () {
        var _this = this;
        var postid = this.wordpressService.postid;
        console.log(postid);
        var alert = this.alertCtrl.create({
            title: 'Tip',
            message: 'Are you sure you want to delelete this?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.wordpressService.deletePost(postid).subscribe(function (data) {
                            _this.wordpressService.postscontent = [];
                            _this.close();
                            loading.dismiss();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                            console.log(data);
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\register\register.html"*/'<ion-list no-lines padding>\n  \n\n       <button (click)="iap()" ion-item  clear small  icon-start>\n          <ion-icon name=\'md-create\'></ion-icon>\n          Edit\n         </button>\n\n        <button  (click)="deletePost()" ion-item  clear small  icon-start>\n          <ion-icon name=\'trash\'></ion-icon>\n          Delete\n         </button> \n\n\n        <button   ion-item  clear small  icon-start>\n          <ion-icon name=\'eye\'></ion-icon>\n          View\n         </button> \n\n      \n    </ion-list>'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\register\register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_forkJoin__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_forkJoin__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PostPage = (function () {
    function PostPage(navParams, navCtrl, loadingCtrl, alertCtrl, wordpressService, authenticationService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
        this.comments = new Array();
        this.categories = new Array();
        this.morePagesAvailable = true;
    }
    PostPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.morePagesAvailable = true;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.post = this.navParams.get('item');
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin(this.getAuthorData())
            .subscribe(function (data) {
            _this.user = data[0].name;
            _this.categories = data[1];
            _this.comments = data[2];
            loading.dismiss();
        });
    };
    PostPage.prototype.getAuthorData = function () {
        return this.wordpressService.getAuthor(this.post.author);
    };
    PostPage.prototype.getCategories = function () {
        return this.wordpressService.getPostCategories(this.post);
    };
    PostPage.prototype.getComments = function () {
        return this.wordpressService.getComments(this.post.id);
    };
    PostPage.prototype.loadMoreComments = function (infiniteScroll) {
        var _this = this;
        var page = (this.comments.length / 10) + 1;
        this.wordpressService.getComments(this.post.id, page)
            .subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _this.comments.push(item);
            }
            infiniteScroll.complete();
        }, function (err) {
            console.log(err);
            _this.morePagesAvailable = false;
        });
    };
    PostPage.prototype.goToCategoryPosts = function (categoryId, categoryTitle) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {
            id: categoryId,
            title: categoryTitle
        });
    };
    PostPage.prototype.createComment = function () {
        var _this = this;
        var user;
        if (this.authenticationService.getUser()) {
            user = this.authenticationService.getUser();
            var alert_1 = this.alertCtrl.create({
                title: 'Add a comment',
                inputs: [
                    {
                        name: 'comment',
                        placeholder: 'Comment'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Accept',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create();
                            loading.present();
                            _this.wordpressService.createComment(_this.post.id, user, data.comment)
                                .subscribe(function (data) {
                                console.log("ok", data);
                                _this.getComments();
                                _this.ionViewWillEnter();
                                loading.dismiss();
                            }, function (err) {
                                console.log("err", err);
                                loading.dismiss();
                            });
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Please login',
                message: 'You need to login in order to comment',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Login',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }
                    }
                ]
            });
            alert_2.present();
        }
    };
    return PostPage;
}());
PostPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-post',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\post\post.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title *ngIf="post">\n      Post\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n \n\n\n  <div *ngIf="post" class="post">\n    <div class="post-title" [innerHTML]="post.title.rendered"></div>\n    <p class="post-content" [innerHTML]="post.content.rendered"></p>\n    <ion-row>\n      <ion-col>\n        <ion-icon name=\'md-calendar\'></ion-icon>\n        {{post.date.split(\'T\')[0]}}\n      </ion-col>\n      <ion-col text-right>\n        <ion-icon name="person"></ion-icon>\n        {{user}}\n      </ion-col>\n    </ion-row>\n    <p class="bold-title">Categories:</p>\n    <ion-grid>\n      <ion-row>\n        <ion-col class="category-col" *ngFor="let category of categories">\n          <ion-badge (click)="goToCategoryPosts(category.id, category.name)">{{category.name}}</ion-badge>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <p class="bold-title">Comments:</p>\n    <ion-item *ngFor="let comment of comments">\n      <ion-avatar item-start>\n        <img src="{{comment.author_avatar_urls[24]}}">\n      </ion-avatar>\n      <h2>{{comment.author_name}}</h2>\n      <p [innerHTML]="comment.content.rendered"></p>\n    </ion-item>\n    <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="loadMoreComments($event)">\n      <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more comments...">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n </div>\n</ion-content>\n<ion-footer>\n <ion-toolbar>\n  <button ion-button block (click)="createComment()">Add a Comment</button>\n </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\post\post.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__["a" /* AuthenticationService */]])
], PostPage);

//# sourceMappingURL=post.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_forkJoin__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WordpressService = (function () {
    function WordpressService(http) {
        this.http = http;
        this.iframe = false;
        this.froalnum = 1;
        this.postscontent = new Array();
        this.imginstat = false;
    }
    WordpressService.prototype.getRecentPosts = function (categoryId, page) {
        if (page === void 0) { page = 1; }
        this.url = localStorage.getItem('url') + '/wp-json/wp/v2/';
        //if we want to query posts by category
        console.log(this.url);
        var token = localStorage.getItem('token');
        console.log(token);
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token });
        var category_url = categoryId ? ("&categories=" + categoryId) : "";
        console.log(this.url
            + 'posts?_embed&page=' + page
            + category_url);
        return this.http.get(this.url
            + 'listing?_embed&page=' + page
            + category_url, { headers: header })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getComments = function (postId, page) {
        if (page === void 0) { page = 1; }
        console.log(this.url
            + "comments?listing=" + postId
            + '&page=' + page);
        return this.http.get(this.url
            + "comments?listing=" + postId
            + '&page=' + page)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getAuthor = function (author) {
        return this.http.get(this.url + "users/" + author)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getPostCategories = function (post) {
        var _this = this;
        var observableBatch = [];
        post.categories.forEach(function (category) {
            observableBatch.push(_this.getCategory(category));
        });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin(observableBatch);
    };
    WordpressService.prototype.getCategory = function (category) {
        return this.http.get(this.url + "categories/" + category)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.createComment = function (postId, user, comment) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var token = localStorage.getItem('token');
        var display_name = localStorage.getItem('display_name');
        var email = localStorage.getItem('user_email');
        header.append('Authorization', 'Bearer ' + token);
        console.log(token);
        return this.http.post(this.url + "comments?token=" + token, {
            author_name: display_name,
            author_email: email,
            post: postId,
            content: comment,
            status: 'approved'
        }, { headers: header })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.updatePost = function (post, postid, imgid, content) {
        console.log(post.title);
        var data = {
            post_meta: [
                {
                    "key": "_thumbnail_id",
                    "value": imgid
                }
            ],
            featured_media: imgid,
            id: postid,
            title: post.title,
            fields: {
                features: [44, 43],
                manufacturer: [56, 55],
            },
            status: 'publish',
            content: content,
            year_value: 100
        };
        var token = localStorage.getItem('token');
        console.log(token);
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        });
        return this.http.put(this.url + 'listing/' + postid, data, { headers: header });
    };
    WordpressService.prototype.createPost = function (post, imgid, content) {
        var data = {
            post_meta: [
                {
                    "key": "_thumbnail_id",
                    "value": imgid
                }
            ],
            featured_media: imgid,
            title: post.title,
            fields: {
                group: "white",
                model: [44, 43]
            },
            status: 'publish',
        };
        var token = localStorage.getItem('token');
        console.log(token);
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        });
        return this.http.post(this.url + 'listing', data, { headers: header });
    };
    WordpressService.prototype.deletePost = function (postid) {
        var token = localStorage.getItem('token');
        console.log(token);
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        });
        console.log(this.url + 'posts/' + postid);
        return this.http.delete(this.url + 'listing/' + postid, { headers: header }).map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getImageWordpress = function (page) {
        if (page === void 0) { page = 1; }
        var token = localStorage.getItem('token');
        console.log(token);
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        });
        return this.http.get(this.url + 'media?page=' + page, { headers: header }).map(function (res) { return res.json(); });
    };
    WordpressService.prototype.uploadimg = function (file, filename) {
        var token = localStorage.getItem('token');
        console.log(file);
        console.log(token);
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer' + token,
            'Content-Disposition': 'form-data;filename=' + filename + ".png",
            'Content-Type': 'image/png',
        });
        return this.http.post(this.url + 'media', file, { headers: header, }).map(function (res) { return res.json(); });
    };
    return WordpressService;
}());
WordpressService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], WordpressService);

var _a;
//# sourceMappingURL=wordpress.service.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_module__ = __webpack_require__(231);

window["$"] = __WEBPACK_IMPORTED_MODULE_0_jquery__;
window["jQuery"] = __WEBPACK_IMPORTED_MODULE_0_jquery__;



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_20" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_post_post__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_gallery_gallery__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_createpost_createpost__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_popover_popover__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_authentication_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_storage__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_rich_text_rich_text__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_froala_editor_js_froala_editor_pkgd_min_js__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_froala_editor_js_froala_editor_pkgd_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_froala_editor_js_froala_editor_pkgd_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angular_froala_wysiwyg__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_in_app_browser__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_17__components_rich_text_rich_text__["a" /* RichTextComponent */],
            __WEBPACK_IMPORTED_MODULE_5__pages_post_post__["a" /* PostPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_createpost_createpost__["a" /* CreatepostPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_gallery_gallery__["a" /* GalleryPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_19_angular_froala_wysiwyg__["a" /* FroalaEditorModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_19_angular_froala_wysiwyg__["b" /* FroalaViewModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/popover/popover.module#PopoverPageModule', name: 'PopoverPage', segment: 'popover', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/gallery/gallery.module#GalleryPageModule', name: 'GalleryPage', segment: 'gallery', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/createpost/createpost.module#CreatepostPageModule', name: 'CreatepostPage', segment: 'createpost', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_post_post__["a" /* PostPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_createpost_createpost__["a" /* CreatepostPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_gallery_gallery__["a" /* GalleryPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_12__services_wordpress_service__["a" /* WordpressService */],
            __WEBPACK_IMPORTED_MODULE_13__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, authenticationService) {
        var _this = this;
        platform.ready().then(function () {
            var sesssion = JSON.parse(authenticationService.getUser());
            console.log(sesssion);
            if (sesssion) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.hide();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Admin\cent\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RichTextComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RichTextComponent = (function () {
    function RichTextComponent() {
        this.uniqueId = "editor" + Math.floor(Math.random() * 1000000);
        this.stringTools = {
            isNullOrWhiteSpace: function (value) {
                if (value == null || value == undefined) {
                    return true;
                }
                value = value.replace(/[\n\r]/g, '');
                value = value.split(' ').join('');
                return value.length === 0;
            }
        };
    }
    RichTextComponent.prototype.getPlaceholderText = function () {
        if (this.placeholderText !== undefined) {
            return this.placeholderText;
        }
        return '';
    };
    RichTextComponent.prototype.updateItem = function () {
        var _this = this;
        var element = this.editor.nativeElement;
        element.innerHTML = this.formControlItem.value;
        // if (element.innerHTML === null || element.innerHTML === '') {
        //   element.innerHTML = '<div></div>';
        // }
        var reactToChangeEvent = function () {
            if (_this.stringTools.isNullOrWhiteSpace(element.innerText)) {
                element.innerHTML = '<div></div>';
                _this.formControlItem.setValue(null);
            }
            else {
                _this.formControlItem.setValue(element.innerHTML);
            }
        };
        element.onchange = function () { return reactToChangeEvent(); };
        element.onkeyup = function () { return reactToChangeEvent(); };
        element.onpaste = function () { return reactToChangeEvent(); };
        element.oninput = function () { return reactToChangeEvent(); };
    };
    RichTextComponent.prototype.wireupButtons = function () {
        var buttons = this.decorate.nativeElement.getElementsByTagName('button');
        var _loop_1 = function (i) {
            var button = buttons[i];
            var command = button.getAttribute('data-command');
            if (command.includes('|')) {
                var parameter_1 = command.split('|')[1];
                command = command.split('|')[0];
                button.addEventListener('click', function () {
                    document.execCommand(command, false, parameter_1);
                });
            }
            else {
                button.addEventListener('click', function () {
                    document.execCommand(command);
                });
            }
        };
        for (var i = 0; i < buttons.length; i++) {
            _loop_1(i);
        }
    };
    RichTextComponent.prototype.ngAfterContentInit = function () {
        this.updateItem();
        this.wireupButtons();
    };
    return RichTextComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('editor'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], RichTextComponent.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('decorate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], RichTextComponent.prototype, "decorate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('styler'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], RichTextComponent.prototype, "styler", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */])
], RichTextComponent.prototype, "formControlItem", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], RichTextComponent.prototype, "placeholderText", void 0);
RichTextComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'rich-text',template:/*ion-inline-start:"C:\Users\Admin\cent\src\components\rich-text\rich-text.html"*/'<div #styler>\n\n</div>\n\n<div #editor contenteditable="true" class="maineditor" tappable [attr.data-placeholder-text]="getPlaceholderText()">\n</div>\n\n<!-- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand -->\n<div #decorate class="decorator">\n    <button data-command="bold"><strong>B</strong></button>\n    <button data-command="italic"><i>I</i></button>\n    <button data-command="underline"><u>U</u></button> &nbsp;\n    <button data-command="fontSize|6"><span style="font-size: 1.5em;">A</span></button>\n    <button data-command="removeFormat"><span style="font-size: 1.0em;">A</span></button>\n    <button data-command="fontSize|1"><span style="font-size: 0.6em;">A</span></button> &nbsp;\n    <button data-command="formatBlock|<h1>">H1</button>\n    <button data-command="formatBlock|<h2>">H2</button>\n    <button data-command="formatBlock|<p>">Normal</button> &nbsp;\n    <button data-command="justifyLeft">Left</button>\n    <button data-command="justifyCenter">Center</button>\n    <button data-command="justifyRight">Right</button>\n    <button data-command="justifyFull">Full</button> &nbsp;\n    <button data-command="insertHorizontalRule">HR</button>\n    <button data-command="insertOrderedList">OL</button>\n    <button data-command="insertUnorderedList">UL</button>\n\n</div>'/*ion-inline-end:"C:\Users\Admin\cent\src\components\rich-text\rich-text.html"*/
    }),
    __metadata("design:paramtypes", [])
], RichTextComponent);

//# sourceMappingURL=rich-text.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover_popover__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__post_post__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createpost_createpost__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_authentication_service__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = (function () {
    function HomePage(alertCtrl, navCtrl, navParams, loadingCtrl, wordpressService, authenticationService, popoverCtrl, iab) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
        this.popoverCtrl = popoverCtrl;
        this.iab = iab;
        this.posts = [];
        this.morePagesAvailable = true;
        this.loggedUser = false;
        this.comments = [];
        this.categories = [2];
        this.posts = this.wordpressService.postscontent;
    }
    HomePage.prototype.doRefresh = function (refresher) {
        this.posts.length = 0;
        this.ionViewWillEnter();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (this.authenticationService.getUser()) {
            this.loggedUser = true;
        }
        else {
            this.loggedUser = false;
        }
        this.morePagesAvailable = true;
        //if we are browsing a category
        this.categoryId = this.navParams.get('id');
        this.categoryTitle = this.navParams.get('title');
        if ((this.wordpressService.postscontent.length == 0)) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.wordpressService.getRecentPosts(this.categoryId)
                .subscribe(function (data) {
                console.log(data);
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var post = data_1[_i];
                    console.log(post.id);
                    if ((post.id, post)) {
                        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                        _this.wordpressService.postscontent.push(post);
                    }
                }
                _this.posts = _this.wordpressService.postscontent;
                _this.posts.sort(function (a, b) { return a.id !== b.id ? a.id < b.id ? -1 : 1 : 0; });
                _this.posts.reverse();
                for (var i = 0; i < _this.posts.length; i++) {
                    console.log(i);
                    _this.wordpressService.getComments(_this.posts[i].id)
                        .subscribe(function (data) {
                        console.log(data);
                        _this.comments.push(data.length);
                    });
                }
                loading_1.dismiss();
            });
        }
    };
    HomePage.prototype.iap = function () {
        // let postid = this.wordpressService.postid;   
        // const options : InAppBrowserOptions = {
        //       zoom: 'no',
        //       fullscreen: 'yes',
        //       toolbar: 'no',
        //       location : 'no'
        //     }
        //     const browser = this.iab.create('https://www.sammysautosalesnc.com/wp-admin/post.php?post='+postid+'&action=edit  ' , '_self' , options);
        //     browser.insertCSS({code:"body{background-color:red !important;}"});
        this.wordpressService.iframe = false;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__popover_popover__["a" /* PopoverPage */], { action: 'Create' });
    };
    HomePage.prototype.postTapped = function (event, post) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__post_post__["a" /* PostPage */], {
            item: post
        });
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        var page = (Math.ceil(this.posts.length / 10)) + 1;
        var loading = true;
        this.wordpressService.getRecentPosts(this.categoryId, page)
            .subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var post = data_2[_i];
                if (!loading) {
                    infiniteScroll.complete();
                }
                _this.wordpressService.postscontent.push(post);
                loading = false;
            }
            _this.posts = _this.wordpressService.postscontent;
        }, function (err) {
            _this.morePagesAvailable = false;
        });
    };
    HomePage.prototype.logOut = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Tip',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        _this.authenticationService.logOut();
                        if (!localStorage.getItem('User')) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                        }
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.goToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.onCreatePost = function () {
        this.wordpressService.urlimgforgallery = null;
        this.wordpressService.title = null;
        this.wordpressService.content = null;
        this.wordpressService.action = "Create Post";
        this.wordpressService.iframe = false;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__createpost_createpost__["a" /* CreatepostPage */]);
    };
    HomePage.prototype.updatePost = function (myEvent, postid, posttitle, postcontent, index, post) {
        console.log(posttitle);
        if (this.posts[index]._embedded['wp:featuredmedia']) {
            this.wordpressService.urlimgforgallery = this.posts[index]._embedded['wp:featuredmedia'][0].source_url;
        }
        this.wordpressService.action = "Update Post";
        this.wordpressService.title = posttitle;
        this.wordpressService.content = postcontent.replace('</p>', '');
        this.wordpressService.content = this.wordpressService.content.replace('<p>', '');
        this.wordpressService.index = index;
        this.wordpressService.posts = this.posts;
        this.wordpressService.imgidforgallery = this.posts[index].featured_media;
        this.wordpressService.postid = postid;
        this.wordpressService.post = post;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.presentPopover = function (myEvent, postid, posttitle, postcontent, index, post) {
        console.log(posttitle);
        this.wordpressService.action = "Update Post";
        this.wordpressService.title = posttitle;
        this.wordpressService.content = postcontent.replace('</p>', '');
        this.wordpressService.content = this.wordpressService.content.replace('<p>', '');
        this.wordpressService.index = index;
        this.wordpressService.posts = this.posts;
        this.wordpressService.imgidforgallery = this.posts[index].featured_media;
        this.wordpressService.postid = postid;
        this.wordpressService.post = post;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        popover.present({
            ev: myEvent
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title *ngIf="!categoryTitle">Recent posts</ion-title>\n    <ion-title *ngIf="categoryTitle">{{categoryTitle}} posts</ion-title>\n    <ion-buttons *ngIf="loggedUser" end>\n      <button ion-button icon-only (click)="logOut()">\n        <ion-icon class="toolbar-icon" name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons *ngIf="!loggedUser" end>\n      <button ion-button icon-only (click)="goToLogin()">\n        <ion-icon class="toolbar-icon" name="log-in"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n\n\n  \n  \n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    \n  </ion-refresher>\n\n\n     <ion-fab right bottom>\n    <button ion-fab  (click)= "\n    iap()" ><ion-icon name="add"></ion-icon></button>\n </ion-fab>\n\n  <ion-card *ngFor="let post of posts ; let i = index " >\n\n\n \n\n      <ion-item    padding *ngFor = "let author of post._embedded.author"> \n    <ion-avatar item-left> \n\n          <img src="{{author.avatar_urls[24]}}">\n\n      </ion-avatar>  \n\n        <h2>{{author.name}}</h2>  \n      <p>{{post.date | date:\'dd/MM/yyyy\'}}</p>\n   \n  </ion-item>\n     \n       <div *ngFor = "let thumbnail of post._embedded[\'wp:featuredmedia\']" >\n \n      <img src=\'{{thumbnail.source_url}}\'  *ngIf = "thumbnail.source_url">\n\n    </div>\n\n\n    <ion-card-content  >\n      <ion-card-title [innerHTML]="post.title.rendered"></ion-card-title>\n    \n      <p [innerHTML]="post.excerpt.rendered"></p>\n\n\n    </ion-card-content>\n    <ion-row no-padding>\n      \n\n      \n\n       <ion-col  col-3>\n         <button ion-button clear small color="primary" (click)="postTapped($event, post)" icon-start>\n            Read More\n         </button>\n       </ion-col>\n\n\n        \n\n        <ion-col  col-2  offset-7 >\n        <button (click)= "updatePost( $event , post.id , post.title.rendered , post.content.rendered , i , post)" ion-button clear small color="primary" icon-start>\n          <ion-icon name=\'more\'></ion-icon>\n           \n         </button>\n\n\n       </ion-col>\n\n     </ion-row>\n  </ion-card>\n  <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n    loadingSpinner="bubbles"\n    loadingText="Loading more posts ...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_8__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_9__services_authentication_service__["a" /* AuthenticationService */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["l" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_native_storage__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticationService = (function () {
    function AuthenticationService(wordpressService, nativeStorage, http) {
        this.wordpressService = wordpressService;
        this.nativeStorage = nativeStorage;
        this.http = http;
    }
    AuthenticationService.prototype.getUser = function () {
        return localStorage.getItem('User');
    };
    AuthenticationService.prototype.setUser = function (user) {
        return localStorage.setItem('User', user);
    };
    AuthenticationService.prototype.logOut = function () {
        sessionStorage.clear();
        return localStorage.clear();
    };
    AuthenticationService.prototype.doLogin = function (username, password, url) {
        console.log(url);
        return this.http.post(url + '/wp-json/jwt-auth/v1/token', {
            username: username,
            password: password
        });
    };
    AuthenticationService.prototype.validateAuthToken = function (token) {
        var header = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        header.append('Authorization', 'Basic ' + token);
        return this.http.post(this.url + 'wp-json/jwt-auth/v1/token/validate?token=' + token, {}, { headers: header });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], AuthenticationService);

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, formBuilder, wordpressService, authenticationService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
        this.ishidden = true;
        this.loginok = false;
    }
    LoginPage.prototype.ionViewWillLoad = function () {
        this.login_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        var loading = this.loadingCtrl.create();
        loading.present();
        document.getElementById("myFrame").src = "https://www.20by4.com/~sammys22/wp-login.php";
        document.getElementById("myFrame").onload = function () {
            loading.dismiss();
        };
    };
    LoginPage.prototype.login = function (value) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authenticationService.doLogin(value.username, value.password, "https://www.20by4.com/~sammys22")
            .subscribe(function (res) {
            console.log(res);
            console.log(res.json().token);
            console.log(res.json().user_display_name);
            console.log(res.json().user_email);
            localStorage.setItem('url', 'https://www.20by4.com/~sammys22');
            localStorage.setItem('token', res.json().token);
            localStorage.setItem('display_name', res.json().user_display_name);
            localStorage.setItem('user_email', res.json().user_email);
            _this.loginok = true;
            _this.authenticationService.setUser(JSON.stringify(res));
        }, function (err) {
            loading.dismiss();
            _this.error_message = "Invalid Credentials. Check your URL, Username or Password";
            console.log(err);
            _this.loginok = false;
        });
        document.getElementById("myFrame").onload = function () {
            _this.ishidden = false;
            if (_this.loginok == true) {
                loading.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
            }
        };
        document.getElementById("myFrame").contentWindow.postMessage(value, document.getElementById("myFrame").src);
    };
    LoginPage.prototype.skipLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.checkFocus = function (value) {
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\login\login.html"*/'<ion-content padding class="form-content">\n  <form class="form" [formGroup]="login_form" >\n    <ion-label class="title">Login to your Site</ion-label>\n\n\n  <!--  <ion-item>\n  \n      <ion-label color="primary">Your URL</ion-label>\n      <ion-input (ionBlur)="checkFocus(login_form.value)" type="text" formControlName="url" placeholder="http://example.com"class="form-controll" required></ion-input>\n    </ion-item> -->\n\n      \n\n\n   <ion-item>\n\n      <ion-label color="primary">Username</ion-label>\n      <ion-input type="text" formControlName="username" class="form-controll" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Password</ion-label>\n      <ion-input type="password" formControlName="password" class="form-controll" required></ion-input>\n    </ion-item>\n    <p class="error-message" *ngIf="error_message">{{error_message}}</p>\n    <button (click)="login(login_form.value)" ion-button full class="login-button" [disabled]="!login_form.valid" type="submit">Login</button>\n  </form>\n\n\n  <iframe   id="myFrame"  src= "" style="display: none;" ></iframe>\n\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__["a" /* WordpressService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__["a" /* WordpressService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _e || Object])
], LoginPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopoverPage = (function () {
    function PopoverPage(navCtrl, navParams, wordpressService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.loadingCtrl = loadingCtrl;
        this.ishidden = true;
        this.action = this.navParams.get('action');
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PopoverPage');
        var loading = this.loadingCtrl.create();
        loading.present();
        var action = this.navParams.get('action');
        var postid = this.wordpressService.postid;
        // this.url = 'https://www.sammysautosalesnc.com/wp-admin/post.php?post='+postid+'&action=edit';
        // console.log(this.url)
        if (action == 'Update') {
            document.getElementById("myFrame").src = localStorage.getItem('url') + '/wp-admin/post.php?post=' + postid + '&action=edit';
        }
        else {
            document.getElementById("myFrame").src = localStorage.getItem('url') + '/wp-admin/post-new.php?post_type=listing';
        }
        document.getElementById("myFrame").onload = function () {
            document.getElementById("myFrame").contentWindow.postMessage('initial', document.getElementById("myFrame").src);
            _this.ishidden = false;
            loading.dismiss();
        };
    };
    PopoverPage.prototype.update = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.ishidden = true;
        document.getElementById("myFrame").contentWindow.postMessage('update', document.getElementById("myFrame").src);
        document.getElementById("myFrame").onload = function () {
            _this.wordpressService.postscontent.length = 0;
            loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        };
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-popover',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\popover\popover.html"*/'<!--\n  Generated template for the PopoverPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title> {{action}} </ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content  >\n\n<iframe  [hidden]="ishidden" id="myFrame" src = \'https://www.sammysautosalesnc.com/wp-admin/post.php?post=1667&action=edit\' style="width: 100%;height: 100%; border-style: none;" ></iframe>\n\n\n\n</ion-content>\n\n\n<ion-footer>\n <ion-toolbar>\n  <button ion-button  (click)="update()" block>{{action}}</button>\n </ion-toolbar>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\popover\popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatepostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_wordpress_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gallery_gallery__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the CreatepostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreatepostPage = (function () {
    function CreatepostPage(navCtrl, modalCtrl, navParams, wordpressService, formBuilder, loadingctrl, popoverCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.wordpressService = wordpressService;
        this.formBuilder = formBuilder;
        this.loadingctrl = loadingctrl;
        this.popoverCtrl = popoverCtrl;
        this.viewCtrl = viewCtrl;
        this.headtitle = 'Create Post';
        this.post = { title: '',
            content: '',
            featuredimg: '' };
        this.ispostfeaturedimg = false;
        this.postid = this.navParams.get('id');
        this.action = this.navParams.get('action');
    }
    CreatepostPage.prototype.ionViewWillEnter = function () {
        console.log(this.wordpressService.action);
        if (this.wordpressService.action && this.wordpressService.action == 'Update Post') {
            this.headtitle = 'Update Post';
            this.post.title = this.wordpressService.title;
            var content = document.getElementsByClassName('fr-element')[0].innerHTML = this.wordpressService.content;
            this.index = this.wordpressService.index;
            this.imgidforgallery = this.wordpressService.imgidforgallery;
            this.postid = this.wordpressService.postid;
            this.posts = this.wordpressService.posts;
            if (this.posts[this.index]._embedded['wp:featuredmedia']) {
                console.log(this.postfeaturedimg = this.wordpressService.urlimgforgallery);
                this.postfeaturedimg = this.wordpressService.urlimgforgallery;
                console.log(this.postfeaturedimg);
                this.ispostfeaturedimg = true;
            }
            else {
                this.postfeaturedimg = this.wordpressService.urlimgforgallery;
                console.log(this.postfeaturedimg);
                if (this.postfeaturedimg) {
                    this.ispostfeaturedimg = true;
                }
            }
        }
        else {
            var content = document.getElementsByClassName('fr-element')[0].innerHTML = this.wordpressService.content;
            console.log(content);
            console.log(this.wordpressService.content);
            this.post.title = this.wordpressService.title;
            this.imgidforgallery = this.wordpressService.imgidforgallery;
            this.postfeaturedimg = this.wordpressService.urlimgforgallery;
            console.log(this.postfeaturedimg);
            if (this.postfeaturedimg) {
                this.ispostfeaturedimg = true;
            }
        }
        console.log(document.getElementsByClassName("fr-hidden"));
        document.querySelectorAll('[title="Code View"]')[0].className =
            document.querySelectorAll('[title="Code View"]')[0].className.replace(/\bfr-hidden\b/g, " ");
        document.querySelectorAll('[title="Align"]')[0].className =
            document.querySelectorAll('[title="Align"]')[0].className.replace(/\bfr-hidden\b/g, " ");
        document.querySelectorAll('[title="Emoticons"]')[0].className =
            document.querySelectorAll('[title="Emoticons"]')[0].className.replace(/\bfr-hidden\b/g, " ");
        document.querySelectorAll('[title="Colors"]')[0].className =
            document.querySelectorAll('[title="Colors"]')[0].className.replace(/\bfr-hidden\b/g, " ");
        document.querySelectorAll('[title="Fullscreen"]')[0].className =
            document.querySelectorAll('[title="Fullscreen"]')[0].className.replace(/\bfr-hidden\b/g, " ");
        var element = document.getElementsByClassName("fr-hidden");
        for (var i = 0; i < element.length; i++) {
            console.log(i);
            element[i].className = element[i].className.replace(/\bfr-hidden\b/g, " ");
            console.log(element[i]);
        }
        document.querySelectorAll('[title="Insert Image (Ctrl+P)"]')[0].className += "fr-hidden";
    };
    CreatepostPage.prototype.ionViewWillLoad = function () {
        this.item = this.formBuilder.control('');
        console.log(this.item);
    };
    CreatepostPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var parent = document.getElementsByClassName("fr-toolbar")[0];
        parent.innerHTML += ' <button id ="img" type="button" tabindex="-1" role="button" title="Insert Table" class=" fr-btn fr-btn-font_awesome"  data-popup="true"style="background: 0 0;color: #222;-moz-outline: 0;outline: 0;border: 0;line-height: 1;cursor: pointer;margin: 0 2px;float: left;padding: 0;width: 38px;height: 38px;"><i class="fa fa-image" aria-hidden="true"></i><span class="fr-sr-only">Insert Table</span></button> ';
        document.getElementById('img').addEventListener("touchend", function () {
            _this.wordpressService.imginstat = true;
            var content = document.getElementsByClassName('fr-element')[0].innerHTML;
            console.log(content);
            _this.wordpressService.content = content;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* GalleryPage */], _this.post);
        });
    };
    CreatepostPage.prototype.ionViewDidEnter = function () {
        if (this.wordpressService.imgins) {
            document.getElementsByClassName('fr-element')[0].innerHTML += '<img src ="' + this.wordpressService.imgins + '" />';
            this.wordpressService.imgins = null;
        }
    };
    CreatepostPage.prototype.onInput = function () {
        this.wordpressService.title = this.post.title;
        this.wordpressService.content = this.post.content;
        var parent = document.getElementsByClassName("fr-toolbar")[0];
    };
    CreatepostPage.prototype.removeFeaturedimg = function () {
        this.post.featuredimg = null;
        this.ispostfeaturedimg = false;
        this.imgidforgallery = 0;
    };
    CreatepostPage.prototype.selectFeaturedimg = function () {
        this.wordpressService.imginstat = false;
        var content = document.getElementsByClassName('fr-element')[0].innerHTML;
        console.log(content);
        this.wordpressService.content = content;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* GalleryPage */], this.post);
    };
    CreatepostPage.prototype.actionPost = function () {
        var _this = this;
        var content = document.getElementsByClassName('fr-element')[0].innerHTML;
        console.log(content);
        if (this.wordpressService.action && this.wordpressService.action == 'Update Post') {
            var loading_1 = this.loadingctrl.create({
                content: 'Updating Post...'
            });
            loading_1.present();
            this.wordpressService.updatePost(this.post, this.postid, this.imgidforgallery, content).subscribe(function (data) {
                loading_1.dismiss();
                console.log("ok", data);
                _this.wordpressService.postscontent = [];
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }, function (err) {
                console.log("err", err);
            });
            ;
        }
        else {
            this.wordpressService.createPost(this.post, this.imgidforgallery, content).subscribe(function (data) {
                _this.wordpressService.postscontent = [];
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }, function (err) {
                console.log("err", err);
            });
            ;
        }
    };
    CreatepostPage.prototype.onBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    CreatepostPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* GalleryPage */]);
        popover.present({
            ev: myEvent
        });
    };
    CreatepostPage.prototype.presentGalleryModal = function () {
        var galleryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__gallery_gallery__["a" /* GalleryPage */]);
        galleryModal.present();
    };
    return CreatepostPage;
}());
CreatepostPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-createpost',template:/*ion-inline-start:"C:\Users\Admin\cent\src\pages\createpost\createpost.html"*/'\n<ion-header>\n\n  <ion-navbar   color="primary">\n     \n\n        <ion-title>{{headtitle}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n		 <form>\n      <ion-item>\n        <ion-label>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="post.title" name="title" required (ionChange) ="onInput($event)"></ion-input>\n      </ion-item>\n       <ion-item>\n      <h2 style="color:#0000007f"> Featured Image </h2> <Br>\n        <img src= \'{{postfeaturedimg}}\'  *ngIf = "ispostfeaturedimg">\n        \n        <ion-row no-padding>   \n      <ion-col>\n         <button ion-button clear  small color="primary" icon-start   \n         (click) = "selectFeaturedimg()" >\n        Set Image\n         </button>\n       </ion-col>   \n      <ion-col text-right>\n           <button ion-button clear small color="danger" icon-start   (click) = "removeFeaturedimg()" >\n            Remove\n           </button>\n      </ion-col>   \n   </ion-row>      \n     \n\n\n\n      </ion-item>\n\n\n    \n\n     <ion-item>\n        <ion-label>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="post.content" name="content" required (ionChange) ="onInput($event)"></ion-input>\n      </ion-item>\n     \n    </form>\n\n    <div id="froala-editor" [froalaEditor] (change) ="onInput($event)"> Write Something</div>\n     \n   \n    <!-- Write your comments here <rich-text [formControlItem]="item" placeholderText="A sample of placeholder text"></rich-text> -->\n\n    \n\n</ion-content>\n\n\n\n<ion-footer>\n <ion-toolbar>\n  <button ion-button  (click)="actionPost()" block>{{headtitle}}</button>\n </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\Admin\cent\src\pages\createpost\createpost.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], CreatepostPage);

//# sourceMappingURL=createpost.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map