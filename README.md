# Angular2-Store
## 1. Development

> 1st Initial the Angular2-Store

```
npm install
npm install -g angular-cli
```

> Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## 2. Main Features

### Version 0.2
- Update product, cart, filter, sort
```
.
\---src
    +---app
    |   |   app.component.html    <- Custom HTML template
    |   |   app.component.scss    <- Define css base on SCSS
    |   |   app.component.spec.ts <- Test cases (Unit test)
    |   |   app.component.ts      <- Define main component
    |   |   app.module.ts         <- Inject data service into component
    |   |   cart.service.spec.ts  <- Test cases (Unit test)
    |   |   cart.service.ts       <- Define Cart service
    |   |
    |   +---cart <- Cart Component
    |   |       cart.component.html
    |   |       cart.component.scss
    |   |       cart.component.spec.ts
    |   |       cart.component.ts
    |   |
    |   +---filters <- Filter Component
    |   |       filters.component.html
    |   |       filters.component.scss
    |   |       filters.component.spec.ts
    |   |       filters.component.ts
    |   |
    |   +---model <- Define Models
    |   |       category.model.ts
    |   |       product.model.ts
    |   |
    |   +---product <- Product showcase Component
    |   |       product.component.html
    |   |       product.component.scss
    |   |       product.component.spec.ts
    |   |       product.component.ts
    |   |
    |   +---product-thumbnail <- Product detail Component
    |   |       product-thumbnail.component.html
    |   |       product-thumbnail.component.scss
    |   |       product-thumbnail.component.spec.ts
    |   |       product-thumbnail.component.ts
    |   |
    |   +---search-bar <- Search Component
    |   |       search-bar.component.html
    |   |       search-bar.component.scss
    |   |       search-bar.component.spec.ts
    |   |       search-bar.component.ts
    |   |
    |   \---sort-filters <- Sort Component
    |           sort-filters.component.html
    |           sort-filters.component.scss
    |           sort-filters.component.spec.ts
    |           sort-filters.component.ts
    |
    +---assets  <- Include images for application
            cart_primary.svg
            cart_white.svg
            link.svg
            search.svg
            send.svg
```

### Version 0.1
- Use sass
- Update style, favicon
- Add json-ld
```
.
|   angular-cli.json   <- Config Angular (Use SASS)
\---src
    |   favicon.ico   <- Favicon for page
    +---app
    |       app.component.html    <- Custom HTML template
    |       app.component.scss    <- Define css base on SCSS
    |       app.component.spec.ts <- Test cases (Unit test)
    |       app.component.ts      <- Define component
    |       app.module.ts         <- Inject data service into component
    |       mock-data.ts          <- Declare the json data for store
    |       mock-seo-data.ts      <- Declare the json data for json-ld
    |       seo.service.spec.ts   <- Test cases (Unit test)
    |       seo.service.ts        <- SEO service help us generate data on html header
    |    
    +---assets  <- Include images for application
    |       .gitkeep
    |       avatar.png
    |       logo.svg
    |
    \---sass <- Define css base on SASS
            styles.sass
            _colors.scss
            _grid.scss
            _mixins.scss
```

## 3. Project Structure

```
.
|   .editorconfig      <- Editor configuration, see http://editorconfig.org
|   .gitignore         <- Ignore files for git
|   angular-cli.json   <- Config Angular command line
|   karma.conf.js      <- Config Unit Test base on Karma
|   LICENSE            <- License information
|   package.json       <- Packages for this application
|   protractor.conf.js <- Config end-2-end test base on protractor
|   README.md          <- It's me
|   tslint.json        <- Config which rule get run
|   
+---e2e                 <- end-2-end test (functional test)
|       app.e2e-spec.ts <- Test cases
|       app.po.ts       <- Define helper
|       tsconfig.json   <- Config test suite
|       
\---src
    |   favicon.ico   <- Favicon for page
    |   index.html    <- This index file will be run first as the app start
    |   main.ts       <- This script will be load for start Angular2
    |   polyfills.ts  <- Import essential library: module, component,...
    |   test.ts       <- Config unit test base on Karma
    |   tsconfig.json <- Config unit test base on Karma
    |   
    +---app
    |   |   app.component.html                         <- Custom HTML template
    |   |   app.component.scss                         <- Define css base on SCSS 
    |   |   app.component.spec.ts                      <- Test cases (Unit test) 
    |   |   app.component.ts                           <- Define component
    |   |   app.module.ts                              <- Inject data service into component
    |   |   mock-data.ts                               <- Declare the json data for store
    |   |   mock-seo-data.ts                           <- Declare the json data for json-ld
    |   |   seo.service.spec.ts                        <- Test cases (Unit test) 
    |   |   seo.service.ts                             <- SEO service help us generate data on html header
    |   |   cart.service.spec.ts                       <- Test cases (Unit test)
    |   |   cart.service.ts                            <- Define Cart service         
    |   |
    |   +---cart <- Cart Component
    |   |       cart.component.html
    |   |       cart.component.scss
    |   |       cart.component.spec.ts
    |   |       cart.component.ts
    |   |
    |   +---filters <- Filter Component
    |   |       filters.component.html
    |   |       filters.component.scss
    |   |       filters.component.spec.ts
    |   |       filters.component.ts
    |   |
    |   +---model <- Define Models
    |   |       category.model.ts
    |   |       product.model.ts
    |   |
    |   +---product <- Product showcase Component
    |   |       product.component.html
    |   |       product.component.scss
    |   |       product.component.spec.ts
    |   |       product.component.ts
    |   |
    |   +---product-thumbnail <- Product detail Component
    |   |       product-thumbnail.component.html
    |   |       product-thumbnail.component.scss
    |   |       product-thumbnail.component.spec.ts
    |   |       product-thumbnail.component.ts
    |   |
    |   +---search-bar <- Search Component
    |   |       search-bar.component.html
    |   |       search-bar.component.scss
    |   |       search-bar.component.spec.ts
    |   |       search-bar.component.ts
    |   |
    |   \---sort-filters <- Sort Component
    |           sort-filters.component.html
    |           sort-filters.component.scss
    |           sort-filters.component.spec.ts
    |           sort-filters.component.ts
    +---assets  <- Include images for application
    |       .gitkeep
    |       avatar.png
    |       logo.svg
    |       cart_primary.svg
    |       cart_white.svg
    |       link.svg
    |       search.svg
    |       send.svg
    |
    +---environments            <- Config environment
    |       environment.prod.ts <- Product environment
    |       environment.ts      <- Develope Config environment
    |
    \---sass <- Define css base on SASS
            styles.sass
            _colors.scss
            _grid.scss
            _mixins.scss
```
