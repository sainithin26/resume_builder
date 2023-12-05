import React, {useRef, useState} from "react";
import styles from "./Body.module.css";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

function Body(){
    const imageUrls = [
        {id: 1, src: require("../../assets/template2.jpg")},
        {id: 2, src: require("../../assets/template1.png")},
    ];
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.resume}>
                <div className={styles.resumeTemplate}>
                    <p className={styles.subheading}>Resume Templates</p>
                    <div className={styles.templates}>
                        {imageUrls.map((imageUrl) => (
                            <Link to={`/resumeTemplate/${imageUrl.id}`}>
                            <img
                                key={imageUrl.id}
                                src={imageUrl.src}
                                alt={`Image ${imageUrl.id}`}
                                className={styles.images}   
                            />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>   
        </div>
    );
}
export default Body;