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
            port: 3002,
        },
    } as any,
    rules.babel,
    {
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./public/index.html"),
            }),
            new webpack.container.ModuleFederationPlugin({
                name: "webapp",
                filename: "remoteEntry.js",
                remotes: {
                    pageA: "pageA@http://localhost:3003/remoteEntry.js"
                }, // webapp에 추가할 remote 패키지
                shared: [
                    {
                        ...pkg.dependencies,
                        react: {
                            singleton: true,
                            eager: true,
                            requiredVersion: pkg.dependencies.react,
                        },
                        "react-dom": {
                            singleton: true,
                            eager: true,
                            requiredVersion: pkg.dependencies["react-dom"],
                        },
                    }
                ],
            }),
        ],
    }
);

export default webpackConfig;
