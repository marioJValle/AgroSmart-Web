import React from "react";
import { Image, Card } from "react-bootstrap";

const ProfileHeader = ({ user }) => {
  // Placeholder user data if not provided
  const currentUser = user || {
    name: " User Example",
    email: " User@example.com ",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Card className="text-center shadow-sm mb-4">
      <Card.Body>
        <Image
          src={user.avatar}
          roundedCircle
          width="150"
          height="150"
          alt="User Avatar"
          className="mb-3"
        />
        <Card.Title as="h4">{user.username}</Card.Title>
        <Card.Text className="text-muted">{user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileHeader;
