import React, { useState, useEffect } from 'react';
import './EmailSignatureForm.css';

const TEMPLATE_COLOR_DEFAULTS = {
  modern: { borderColor: '#667eea', backgroundColor: '#f8f9fa' },
  creative: { borderColor: '#ff6b6b', backgroundColor: '#fff5e6' },
};

function EmailSignatureForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    email: '',
    phone: '',
    website: '',
    template: 'classic',
    borderColor: '#667eea',
    backgroundColor: '#f8f9fa',
  });

  // Reset colors to template defaults when template changes
  useEffect(() => {
    const defaults = TEMPLATE_COLOR_DEFAULTS[formData.template];
    if (defaults) {
      setFormData(prev => ({
        ...prev,
        borderColor: defaults.borderColor,
        backgroundColor: defaults.backgroundColor,
      }));
    }
  }, [formData.template]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="email-signature-form" onSubmit={handleSubmit}>
      <h2>Generate your Email Signature</h2>

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="profession">Job Title / Profession *</label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="template">Design Template *</label>
        <div className="template-options">
          <label className={`template-option ${formData.template === 'classic' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="template"
              value="classic"
              checked={formData.template === 'classic'}
              onChange={handleChange}
            />
            <div className="template-card">
              <div className="template-preview classic-preview"></div>
              <div className="template-info">
                <div className="template-name">Classic</div>
                <div className="template-desc">Traditional layout with divider</div>
              </div>
            </div>
          </label>

          <label className={`template-option ${formData.template === 'modern' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="template"
              value="modern"
              checked={formData.template === 'modern'}
              onChange={handleChange}
            />
            <div className="template-card">
              <div className="template-preview modern-preview"></div>
              <div className="template-info">
                <div className="template-name">Modern</div>
                <div className="template-desc">Clean with color accents</div>
              </div>
            </div>
          </label>

          <label className={`template-option ${formData.template === 'creative' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="template"
              value="creative"
              checked={formData.template === 'creative'}
              onChange={handleChange}
            />
            <div className="template-card">
              <div className="template-preview creative-preview"></div>
              <div className="template-info">
                <div className="template-name">Creative</div>
                <div className="template-desc">Colorful with icons</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {(formData.template === 'modern' || formData.template === 'creative') && (
        <div className="form-group color-pickers-group">
          <label>Customize Colors</label>
          <div className="color-pickers">
            <div className="color-picker-item">
              <label htmlFor="borderColor">{formData.template === 'modern' ? 'Border Color' : 'Accent Color'}</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="borderColor"
                  name="borderColor"
                  value={formData.borderColor}
                  onChange={handleChange}
                />
                <span className="color-value">{formData.borderColor}</span>
              </div>
            </div>
            <div className="color-picker-item">
              <label htmlFor="backgroundColor">Background Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="backgroundColor"
                  name="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={handleChange}
                />
                <span className="color-value">{formData.backgroundColor}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="submit-btn">
        Generate Signature
      </button>
    </form>
  );
}

export default EmailSignatureForm;
