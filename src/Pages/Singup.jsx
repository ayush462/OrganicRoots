import React, { useState } from "react";
import { Header } from "../Component/Header";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Singup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const handleSinup = async (e) => {
    e.preventDefault();

    if (!user.role) {
      toast.error("Please select a user type!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Password not match!!");
      return;
    }

    try {
      const res = await fetch("http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/auth/singup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // role still sent to backend
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok) {
        toast.success("Signup Successfull!!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
      toast.error( "Something went wrong!!");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong!!");
    }
  };

  const isSeller = user.role === "SELLER";
  const isBuyer = user.role === "BUYER";

  const handleRoleClick = (role) => {
    setUser((prev) => ({ ...prev, role }));
  };

  return (
    <>
      <Header />

      <div
        className="login-page-wrapper d-flex justify-content-center align-items-center"
        style={{
          minHeight: "85vh",
          padding: "20px",
          background:
            "radial-gradient(circle at top, rgba(111,195,137,0.25), transparent 60%), #f7fff9",
        }}
      >
        <div
          className="login-card-landscape shadow-lg d-flex flex-row"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            overflow: "hidden",
            maxWidth: "960px",
            width: "100%",
            minHeight: "460px",
          }}
        >
          {/* LEFT SIDE – avatar + centered user type cards */}
          <div
            className="login-visual-side"
            style={{
              flex: 1.1,
              background:
                "linear-gradient(140deg, #3fa96a, #6bc389, #a2e59c)",
              color: "#ffffff",
              padding: "28px 24px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* floating circles */}
            <div
              className="floating-circle"
              style={{
                position: "absolute",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.45)",
                top: "18px",
                right: "24px",
                animation: "float 5s ease-in-out infinite",
                opacity: 0.8,
              }}
            />
            <div
              className="floating-circle"
              style={{
                position: "absolute",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.45)",
                bottom: "48px",
                left: "32px",
                animation: "float 6s ease-in-out infinite",
                animationDelay: "1s",
                opacity: 0.7,
              }}
            />

            {/* center content vertically */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* avatar + text */}
              <div style={{ marginBottom: 160 }}>
                <div
                  className="avatar-wrapper"
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 20%, #ffffff, #7edea2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 14px 25px rgba(0,0,0,0.25)",
                    marginBottom: 12,
                    animation: "bounceSoft 3.5s ease-in-out infinite",
                  }}
                >
                  <i
                    className="fa fa-user-plus"
                    style={{ color: "#2f6f46", fontSize: 38 }}
                  />
                </div>

                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Join the OrganicRoots family
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    opacity: 0.95,
                    marginBottom: 10,
                    maxWidth: "260px",
                  }}
                >
                  Create your account to unlock fresh deals, curated boxes, and a
                  seamless organic shopping experience.
                </p>
              </div>

              {/* user type cards in the middle */}
              <div>
                <p
                  style={{
                    fontSize: 13,
                    marginBottom: 6,
                    opacity: 0.9,
                  }}
                >
                  Choose your user type:
                </p>

                <div
                  className="d-flex flex-row flex-wrap"
                  style={{ gap: "10px" }}
                >
                  {/* Seller card */}
                  <div
                    onClick={() => handleRoleClick("SELLER")}
                    style={{
                      flex: "1 1 120px",
                      minWidth: "120px",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      backgroundColor: isSeller
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.16)",
                      border: isSeller
                        ? "1px solid rgba(255,255,255,0.85)"
                        : "1px solid rgba(255,255,255,0.3)",
                      boxShadow: isSeller
                        ? "0 8px 16px rgba(0,0,0,0.20)"
                        : "none",
                      backdropFilter: "blur(2px)",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    className={isSeller ? "role-card-active" : "role-card"}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: isSeller
                          ? "bounceSoft 2.8s ease-in-out infinite"
                          : "none",
                      }}
                    >
                      <i
                        className="fa fa-store"
                        style={{
                          color: "#2f6f46",
                          fontSize: 16,
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        Seller
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          opacity: 0.9,
                        }}
                      >
                        List your organic products
                      </div>
                    </div>
                  </div>

                  {/* Buyer card */}
                  <div
                    onClick={() => handleRoleClick("BUYER")}
                    style={{
                      flex: "1 1 120px",
                      minWidth: "120px",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      backgroundColor: isBuyer
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.16)",
                      border: isBuyer
                        ? "1px solid rgba(255,255,255,0.85)"
                        : "1px solid rgba(255,255,255,0.3)",
                      boxShadow: isBuyer
                        ? "0 8px 16px rgba(0,0,0,0.20)"
                        : "none",
                      backdropFilter: "blur(2px)",
                      transition:
                        "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    className={isBuyer ? "role-card-active" : "role-card"}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: isBuyer
                          ? "bounceSoft 2.8s ease-in-out infinite"
                          : "none",
                      }}
                    >
                      <i
                        className="fa fa-shopping-basket"
                        style={{
                          color: "#2f6f46",
                          fontSize: 16,
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        Buyer
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          opacity: 0.9,
                        }}
                      >
                        Shop fresh organics
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – signup form (User Type hidden here) */}
          <div
            className="login-form-side d-flex flex-column"
            style={{
              flex: 1,
              padding: "26px 28px 24px",
            }}
          >
            <div
              style={{
                marginBottom: 16,
                borderBottom: "1px solid #f1f1f1",
                paddingBottom: 10,
              }}
            >
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: 4,
                }}
              >
                Create an account
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#777",
                }}
              >
                Fill in your details to get started.
              </p>
            </div>

            <form
              onSubmit={handleSinup}
              className="d-flex flex-column flex-grow-1"
            >
              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: 13,
                    color: "#555",
                    marginBottom: 4,
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Your full name"
                  name="name"
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  value={user.name}
                  minLength={3}
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: 13,
                    color: "#555",
                    marginBottom: 4,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="you@example.com"
                  name="email"
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  value={user.email}
                  minLength={6}
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: 13,
                    color: "#555",
                    marginBottom: 4,
                  }}
                >
                  Password
                </label>
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: 6,
                    paddingRight: 8,
                    backgroundColor: "#fff",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-0"
                    style={{ boxShadow: "none" }}
                    required
                    placeholder="Create a password"
                    name="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    value={user.password}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      style={{ color: "#777" }}
                    />
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <label
                  style={{
                    fontSize: 13,
                    color: "#555",
                    marginBottom: 4,
                  }}
                >
                  Confirm Password
                </label>
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: 6,
                    paddingRight: 8,
                    backgroundColor: "#fff",
                  }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control border-0"
                    style={{ boxShadow: "none" }}
                    required
                    placeholder="Re-enter password"
                    name="confirmPassword"
                    onChange={(e) =>
                      setUser({
                        ...user,
                        confirmPassword: e.target.value,
                      })
                    }
                    value={user.confirmPassword}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    <i
                      className={`fa ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      style={{ color: "#777" }}
                    />
                  </button>
                </div>
              </div>

              {/* no User Type select here – only left side controls it */}

              <div className="mt-auto">
                <button
                  className="btn btn-primary d-block w-100"
                  id="submit-id-submit"
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(135deg, #6bc389, #3fa96a)",
                    border: "none",
                    fontWeight: 600,
                    boxShadow: "0 6px 14px rgba(63,169,106,0.35)",
                  }}
                >
                  Sign Up
                </button>

                <div
                  style={{
                    paddingTop: 10,
                    textAlign: "center",
                    fontSize: 13,
                  }}
                >
                 <p style={{ marginBottom: 0 }}>
  Already have an account?{" "}
  <Link id="register-link" to="/login">
    Sign In!
  </Link>
</p>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
