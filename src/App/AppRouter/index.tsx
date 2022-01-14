import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import HomePage from 'src/pages/HomePage';
import ExplorePage from 'src/pages/ExplorePage';
import SingleNFTFixedPrice from 'src/pages/SingleNFTFixedPrice';
import SingleNFTAuction from 'src/pages/SingleNFTAuction';
import BlindBoxPage from 'src/pages/BlindBoxPage';
import BlindBoxProduct from 'src/pages/BlindBoxProduct';
import ProfilePage from 'src/pages/ProfilePage';
import MyNFTBuyNow from 'src/pages/MyNFT/BuyNow';
import MyNFTAuction from 'src/pages/MyNFT/Auction';
import MyNFTCreated from 'src/pages/MyNFT/Created';
import MyNFTSold from 'src/pages/MyNFT/Sold';
import LoginPage from 'src/pages/LoginPage';
import AdminPage from 'src/pages/AdminPage';

const AppRouter: React.FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/auth1"
                    element={
                        <Layout>
                            <LoginPage />
                        </Layout>
                    }
                />
                <Route
                    index
                    element={
                        <Layout>
                            <HomePage />
                        </Layout>
                    }
                />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                    path="/products"
                    element={
                        <Layout>
                            <ExplorePage />
                        </Layout>
                    }
                />
                <Route
                    path="/blind-box"
                    element={
                        <Layout>
                            <BlindBoxPage />
                        </Layout>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Layout>
                            <ProfilePage />
                        </Layout>
                    }
                />
                <Route
                    path="/products/fixed-price/:id"
                    element={
                        <Layout>
                            <SingleNFTFixedPrice />
                        </Layout>
                    }
                />
                <Route
                    path="/products/auction/:id"
                    element={
                        <Layout>
                            <SingleNFTAuction />
                        </Layout>
                    }
                />
                <Route
                    path="/blind-box/product/:id"
                    element={
                        <Layout>
                            <BlindBoxProduct />
                        </Layout>
                    }
                />
                <Route
                    path="/mynft/buynow/:id"
                    element={
                        <Layout>
                            <MyNFTBuyNow />
                        </Layout>
                    }
                />
                <Route
                    path="/mynft/auction/:id"
                    element={
                        <Layout>
                            <MyNFTAuction />
                        </Layout>
                    }
                />
                <Route
                    path="/mynft/created/:id"
                    element={
                        <Layout>
                            <MyNFTCreated />
                        </Layout>
                    }
                />
                <Route
                    path="/mynft/sold/:id"
                    element={
                        <Layout>
                            <MyNFTSold />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
