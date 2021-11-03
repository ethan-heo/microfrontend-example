import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export const html = {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../../public/index.html"),
        }),
    ],
};
