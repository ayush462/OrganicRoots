import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../Component/Header";
import toast from "react-hot-toast";
import { OrganicRootsLoader } from "../Component/OrganicRootsLoader";

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double submit
    setLoading(true);

    try {
      const res = await fetch(
        "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/auth/singin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.jwt);
        toast.success("Welcome back to OrganicRoots");
        navigate("/"); // SPA navigation so toast stays visible
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div
        className="login-page-wrapper d-flex justify-content-center align-items-center"
        style={{
          minHeight: "85vh",
          padding: "16px",
          background:
            "radial-gradient(circle at top, rgba(111,195,137,0.25), transparent 60%), #f7fff9",
        }}
      >
        <div
          className="login-card-landscape shadow-lg d-flex flex-column flex-md-row w-100"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            overflow: "hidden",
            maxWidth: "960px",
            minHeight: "420px",
            opacity: loading ? 0.85 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {/* LEFT SIDE – visual + animation */}
          <div
            className="login-visual-side d-flex flex-column justify-content-between w-100"
            style={{
              flex: 1.1,
              background: "linear-gradient(140deg, #3fa96a, #6bc389, #a2e59c)",
              color: "#ffffff",
              padding: "24px 20px",
              position: "relative",
            }}
          >
            {/* floating decorative circles */}
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

            {/* avatar + text */}
            <div style={{ marginTop: 8, marginBottom: 16 }}>
              <div
                className="avatar-wrapper bounce mx-auto mx-md-0"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 20%, #ffffff, #7edea2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 14px 25px rgba(0,0,0,0.25)",
                  marginBottom: 16,
                }}
              >
                <i
                  className="fa fa-user"
                  style={{ color: "#2f6f46", fontSize: 32 }}
                />
              </div>

              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 6,
                  textAlign: "center",
                }}
                className="text-md-start"
              >
                Welcome back to OrganicRoots
              </h2>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.95,
                  marginBottom: 14,
                  maxWidth: "280px",
                  textAlign: "center",
                }}
                className="mx-auto mx-md-0 text-md-start"
              >
                Fresh, organic goodness delivered at your doorstep. Sign in and
                continue your healthy journey.
              </p>
            </div>

            {/* small feature chips */}
            <div
              style={{ gap: 12, display: "flex", flexWrap: "wrap" }}
              className="justify-content-center justify-content-md-start"
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.18)",
                  fontSize: 12,
                  marginRight: 6,
                  marginBottom: 6,
                  backdropFilter: "blur(2px)",
                }}
              >
                <i
                  className="fa fa-leaf"
                  style={{ marginRight: 6, fontSize: 13 }}
                />
                100% Organic
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.18)",
                  fontSize: 12,
                  marginRight: 6,
                  marginBottom: 6,
                  backdropFilter: "blur(2px)",
                }}
              >
                <i
                  className="fa fa-truck"
                  style={{ marginRight: 6, fontSize: 13 }}
                />
                Same-day delivery
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.18)",
                  fontSize: 12,
                  marginRight: 6,
                  marginBottom: 6,
                  backdropFilter: "blur(2px)",
                }}
              >
                <i
                  className="fa fa-heart"
                  style={{ marginRight: 6, fontSize: 13 }}
                />
                Curated for you
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – form */}
          <div
            className="login-form-side d-flex flex-column w-100"
            style={{
              flex: 1,
              padding: "22px 20px 20px",
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
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: 4,
                }}
              >
                Login
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#777",
                }}
              >
                Enter your credentials to access your account.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="d-flex flex-column flex-grow-1"
            >
              <div style={{ marginBottom: 12 }}>
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
                  className="email-input form-control"
                  style={{ marginBottom: 8 }}
                  required
                  placeholder="you@example.com"
                  name="email"
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  value={user.email}
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: 6 }}>
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
                    opacity: loading ? 0.8 : 1,
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="password-input form-control border-0"
                    style={{ boxShadow: "none" }}
                    required
                    placeholder="Enter your password"
                    name="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    value={user.password}
                    minLength={6}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loading}
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

              <div className="d-flex justify-content-between mt-1 mb-3">
                <div className="form-check form-check-inline" />
                <a
                  id="forgot-password-link"
                  href="#"
                  style={{
                    fontSize: 12,
                    pointerEvents: loading ? "none" : "auto",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-auto">
                <button
                  className="btn d-block w-100"
                  id="submit-id-submit"
                  type="submit"
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(135deg, #6bc389, #3fa96a)",
                    border: "none",
                    fontWeight: 600,
                    boxShadow: "0 6px 14px rgba(63,169,106,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: "#fff",
                  }}
                >
                  <span>{loading ? "Logging in..." : "Login"}</span>
                </button>

                <div
                  style={{
                    paddingTop: 10,
                    textAlign: "center",
                    fontSize: 13,
                  }}
                >
                  <p style={{ marginBottom: 0 }}>
                    Don&apos;t have an account?{" "}
                    <Link
                      id="register-link"
                      to="/singup"
                      style={{
                        pointerEvents: loading ? "none" : "auto",
                        opacity: loading ? 0.6 : 1,
                      }}
                    >
                      Sign Up!
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Center full-screen OrganicRoots loader */}
        {loading && (
          <OrganicRootsLoader
            message="Logging you in securely..."
            fullScreen
          />
        )}
      </div>
    </>
  );
};
