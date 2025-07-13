import React, { useState } from 'react';
import { validateEnvironmentConfig, getConfigurationInstructions } from '../../utils/configValidator';
import Icon from '../AppIcon';
import Button from './Button';

const ConfigurationSetup = ({ onClose, onRetry }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [copied, setCopied] = useState(null);
  
  const instructions = getConfigurationInstructions();
  const config = validateEnvironmentConfig();

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRetryConfiguration = () => {
    const newConfig = validateEnvironmentConfig();
    if (newConfig.hasAIService) {
      onRetry?.();
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-academic-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-warning to-error rounded-full flex items-center justify-center">
              <Icon name="Settings" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                {instructions.title}
              </h2>
              <p className="text-text-secondary font-caption text-sm">
                {instructions.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={16}
            className="text-text-muted hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Status */}
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div>
                <h3 className="font-medium text-error mb-1">Configuration Issues Detected</h3>
                <ul className="text-sm text-error-600 space-y-1">
                  {config.missing.map((key) => (
                    <li key={key}>• Missing: {key}</li>
                  ))}
                </ul>
                {config.warnings.map((warning, index) => (
                  <p key={index} className="text-sm text-warning-600 mt-2">{warning}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Setup Button */}
          <div className="mb-6">
            <Button
              variant={showInstructions ? "outline" : "primary"}
              onClick={() => setShowInstructions(!showInstructions)}
              iconName={showInstructions ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
              className="w-full justify-center"
            >
              {showInstructions ? 'Hide' : 'Show'} Setup Instructions
            </Button>
          </div>

          {/* Detailed Instructions */}
          {showInstructions && (
            <div className="space-y-6">
              {instructions.steps.map((step) => (
                <div key={step.step} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary mb-1">{step.title}</h4>
                      <p className="text-text-secondary text-sm mb-3">{step.description}</p>
                      {step.code && (
                        <div className="relative">
                          <pre className="bg-gray-100 rounded-lg p-3 text-sm font-mono overflow-x-auto">
                            <code>{step.code}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(step.code, `step-${step.step}`)}
                            className="absolute top-2 right-2 text-text-muted hover:text-text-primary"
                            iconName={copied === `step-${step.step}` ? "Check" : "Copy"}
                            iconSize={14}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Helpful Links */}
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="ExternalLink" size={16} className="text-accent mr-2" />
                  Helpful Links
                </h4>
                <div className="space-y-2">
                  {instructions.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:text-accent-600 text-sm font-medium"
                    >
                      {link.title} →
                      <p className="text-text-secondary text-xs mt-1">{link.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              variant="primary"
              onClick={handleRetryConfiguration}
              iconName="RefreshCw"
              iconSize={16}
              className="flex-1"
            >
              Check Configuration
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Continue with Fallback Content
            </Button>
          </div>

          {/* Note */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">
              <Icon name="Info" size={14} className="inline mr-2" />
              The application will work with fallback content, but AI features like personalized study plans and smart recommendations will be limited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSetup;