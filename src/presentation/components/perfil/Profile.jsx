import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProfileHeader from "./ProfileHeader";
import UserInfo from "./UserInfo";
import { UserRepository } from "../../../data/repositories/userRepository/UserRepository";

import { getAuth } from "firebase/auth";

const repository = new UserRepository();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const fUser = auth.currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      if (fUser && fUser.email) {
        try {
          const userData = await repository.getUserByEmail(fUser.email);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error appropriately, e.g., show an error message
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [fUser]); // Re-run effect if fUser changes

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <p>No user data found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <ProfileHeader user={user} />
          <UserInfo user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
