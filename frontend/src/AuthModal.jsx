import { useState } from 'react'
import { createPortal } from 'react-dom'

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)

  if (!isOpen) return null

  return createPortal(
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to code2hire to continue' : 'Join code2hire to start your journey'}</p>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <i className="fa-regular fa-user"></i>
                <input type="text" placeholder="John Doe" />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <i className="fa-regular fa-envelope"></i>
              <input type="email" placeholder="john@example.com" />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <i className="fa-solid fa-phone"></i>
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="••••••••" />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <i className="fa-solid fa-shield-halved"></i>
                <input type="password" placeholder="••••••••" />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit">
            {isLogin ? 'Sign In with Email' : 'Sign Up with Email'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button className="switch-auth-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AuthModal
