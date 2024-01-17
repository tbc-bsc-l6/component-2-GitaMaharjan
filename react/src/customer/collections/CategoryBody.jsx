import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_category } from "../../authentication/categorySlice";
import { Link, useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  // minHeight: '100vh',
};

export default function CategoryBody() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.categoryReducer.category);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-categories")
      .then((response) => {
        console.log(response);
        dispatch(add_category(response.data.allCategories));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [dispatch]);

  return (
    <div style={containerStyle}>
      <ImageList className=" ml-10 mr-10 mb-10 ">
        <ImageListItem key="Subheader" cols={4}>
          <ListSubheader component="div">All Categories</ListSubheader>
        </ImageListItem>
        {items ? (
          items.map((category) => (
            <ImageListItem
              key={category.image}
              sx={{ width: "300px", height: "200px", position: "relative" }}
            >
              <img
                src={
                  category.image.includes("https")
                    ? `${category.image}`
                    : `http://127.0.0.1:8000/images/${category.image}`
                }
                alt={category.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <ImageListItemBar
                title={category.name}
                subtitle={category.description}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${category.description}`}
                  >
                    <Link to={`${category.name}`}>
                      <InfoIcon />
                    </Link>
                  </IconButton>
                }
              />
            </ImageListItem>
          ))
        ) : (
          <div>No categories</div>
        )}
      </ImageList>
    </div>
  );
}
