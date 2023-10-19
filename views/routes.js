// This file contains strings referencing the routes mapped out by Expo Router.
//
// Expo Router uses nested folders to build routes. Each directory can have a
// _layout.jsx file that represents a layout to be applied to all files in
// the directory.
//
// Since each directory can only contain one _layout.jsx file, directories
// have to be "nested" if they require multiple navigation layouts. Folders in
// () indicate a nested directory - two folders representing a single route
// that requires two different layouts. The folder in () will be excluded from
// the final route path.
//
// Route files contain views which are composed of components. They should always
// be lowercase. Code that isn't involved in routing or layouts should be excluded.
//
// For each directory, index files are assumed to be the route's landing page.
// The "app" folder is equivalent to "/" the root.
//
// Examples:
//      - app/index.jsx uses _layout.jsx file in the app directory.
//        The route will be "/"
//      - app/contact/index.jsx will use the layout files in app and contact.
//        The route will be "/contact"
//
// Examples w/ Nested Folders:
//      - app/(home)/index.jsx uses _layout.jsx files in app and (home) directories.
//        The route will be "/"
//      - app/(home)/contact/index.jsx will use the layout files in app, (home) and contact.
//        The route will be "/contact"
//      Note that, in both cases, the (*) folder is not included in the final route.

export default { home: "../", about: "about/", contact: "about/contact" };
