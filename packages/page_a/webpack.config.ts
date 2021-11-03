import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { rules } from "../../webpack/parts";
import pkg from "./package.json";

const webpackConfig = merge<webpack.Configuration>(
    {
        mode: "development",
        entry: path.resolve(__dirname, "./src/index.ts"),
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
    },
    {
        devServer: {
            // contentBase: path.resolve(__dirname, "../dist"),
            port: 3003,
        },
    } as any,
    rules.babel,
    {
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./public/index.html"),
            }),
            new webpack.container.ModuleFederationPlugin({
                name: "pageA",
                library: { type: "var", name: "pageA" },
                filename: "remoteEntry.js",
                exposes: {
                    "./PageA": "./src/PageA.tsx",
                },
                shared: {
                    ...pkg.dependencies,
                    react: {
                        singleton: true,
                        requiredVersion: pkg.dependencies.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: pkg.dependencies["react-dom"],
                    }
                },
            }),
        ],
    }
);

export default webpackConfig;
