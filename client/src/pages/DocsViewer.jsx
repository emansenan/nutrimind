import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    BookOpen, ChevronRight, ArrowLeft, FileText, Loader2
} from 'lucide-react';
import './DocsPage.css';

/* ─────────────────────── Doc Registry ─────────────────────── */
const DOC_REGISTRY = [
    { slug: 'quick-start', file: 'QUICK_START.md', categoryId: 'getting-started', titleKey: 'docs.items.quickStart' },
    { slug: 'setup', file: 'SETUP.md', categoryId: 'getting-started', titleKey: 'docs.items.setup' },
    { slug: 'deployment-instructions', file: 'DEPLOYMENT_INSTRUCTIONS.md', categoryId: 'getting-started', titleKey: 'docs.items.deployInstructions' },
    { slug: 'readme', file: 'README.md', categoryId: 'getting-started', titleKey: 'docs.items.readme' },
    { slug: 'extending-your-app', file: 'EXTENDING_YOUR_APP.md', categoryId: 'getting-started', titleKey: 'docs.items.extendingApp' },
    { slug: 'v4-sdk-reference', file: 'V4_SDK_REFERENCE.md', categoryId: 'frontend-sdk', titleKey: 'docs.items.v4Sdk' },
    { slug: 'branding', file: 'BRANDING.md', categoryId: 'frontend-sdk', titleKey: 'docs.items.branding' },
    { slug: 'backend-sdk', file: 'BACKEND_SDK_AGENTS_GUIDE.md', categoryId: 'backend-sdk', titleKey: 'docs.items.backendSdk' },
    { slug: 'ai-agents', file: 'AI_AGENTS_GUIDE.md', categoryId: 'ai-integration', titleKey: 'docs.items.aiAgents' },
    { slug: 'saas', file: 'SAAS.md', categoryId: 'saas-features', titleKey: 'docs.items.saas' },
    { slug: 'deployment', file: 'DEPLOYMENT.md', categoryId: 'deployment', titleKey: 'docs.items.deployment' },
    { slug: 'example-credit-control', file: 'EXAMPLE_APP_CREDIT_CONTROL.md', categoryId: 'example-apps', titleKey: 'docs.items.exCreditControl' },
    { slug: 'example-order-cycle', file: 'EXAMPLE_APP_ORDER_CYCLE.md', categoryId: 'example-apps', titleKey: 'docs.items.exOrderCycle' },
    { slug: 'example-otax', file: 'EXAMPLE_APP_OTAX.md', categoryId: 'example-apps', titleKey: 'docs.items.exOtax' },
    { slug: 'example-teamsync', file: 'EXAMPLE_APP_TEAMSYNC.md', categoryId: 'example-apps', titleKey: 'docs.items.exTeamSync' },
    { slug: 'example-oracle-ebs', file: 'EXAMPLE_INTEGRATION_ORACLE_EBS.md', categoryId: 'example-apps', titleKey: 'docs.items.exOracleEbs' },
    { slug: 'website-and-marketing', file: 'WEBSITE_AND_MARKETING.md', categoryId: 'go-to-market', titleKey: 'docs.items.websiteMarketing' },
    { slug: 'sales-flyers', file: 'SALES_FLYERS.md', categoryId: 'go-to-market', titleKey: 'docs.items.salesFlyers' },
];

const CATEGORY_ORDER = [
    'getting-started', 'deployment', 'go-to-market',
    'saas-features', 'ai-integration', 'example-apps',
    'frontend-sdk', 'backend-sdk',
];

const CATEGORY_LABELS = {
    'getting-started': 'docs.categories.gettingStarted',
    'frontend-sdk': 'docs.categories.frontendSdk',
    'backend-sdk': 'docs.categories.backendSdk',
    'ai-integration': 'docs.categories.aiIntegration',
    'saas-features': 'docs.categories.saasFeatures',
    'deployment': 'docs.categories.deployment',
    'example-apps': 'docs.categories.exampleApps',
    'go-to-market': 'docs.categories.goToMarket',
};

/* ─────────────────────── Component ─────────────────────── */
function DocsViewer() {
    const { slug } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentDoc = useMemo(() =>
        DOC_REGISTRY.find(d => d.slug === slug),
        [slug]);

    const currentCategory = currentDoc?.categoryId;

    // Group docs by category for sidebar
    const grouped = useMemo(() => {
        const map = {};
        for (const cat of CATEGORY_ORDER) {
            map[cat] = DOC_REGISTRY.filter(d => d.categoryId === cat);
        }
        return map;
    }, []);

    // Fetch markdown content
    useEffect(() => {
        if (!currentDoc) {
            setError('not-found');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`/docs/${currentDoc.file}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load');
                return res.text();
            })
            .then(text => {
                setContent(text);
                setLoading(false);
            })
            .catch(() => {
                setError('load-failed');
                setLoading(false);
            });
    }, [currentDoc]);

    // Scroll to top on doc change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    /* ── Code block renderer ── */
    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
                return (
                    <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            margin: '0 0 1rem',
                        }}
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                );
            }
            return <code className={className} {...props}>{children}</code>;
        },
    };

    return (
        <div className="docs-viewer">
            {/* ── Sidebar ── */}
            <aside className="docs-sidebar">
                <div className="docs-sidebar-inner">
                    <button
                        className="docs-sidebar-back"
                        onClick={() => navigate('/docs')}
                    >
                        <ArrowLeft size={14} />
                        {t('docs.backToHub')}
                    </button>

                    {CATEGORY_ORDER.map(catId => (
                        <div key={catId} className="docs-sidebar-category">
                            <div className="docs-sidebar-category-title">
                                {t(CATEGORY_LABELS[catId])}
                            </div>
                            {grouped[catId].map(doc => (
                                <button
                                    key={doc.slug}
                                    className={`docs-sidebar-link ${doc.slug === slug ? 'active' : ''}`}
                                    onClick={() => navigate(`/docs/${doc.slug}`)}
                                >
                                    <FileText size={13} />
                                    {t(doc.titleKey)}
                                    <ChevronRight size={12} className="chevron" />
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="docs-content">
                {/* Breadcrumb */}
                <div className="docs-breadcrumb">
                    <Link to="/docs">{t('docs.breadcrumbHub')}</Link>
                    <ChevronRight size={12} />
                    {currentCategory && (
                        <>
                            <span>{t(CATEGORY_LABELS[currentCategory])}</span>
                            <ChevronRight size={12} />
                        </>
                    )}
                    <span>{currentDoc ? t(currentDoc.titleKey) : slug}</span>
                </div>

                {/* Content */}
                {loading && (
                    <div className="docs-loading">
                        <Loader2 size={20} className="animate-spin" />
                        {t('docs.loading')}
                    </div>
                )}

                {error === 'not-found' && (
                    <div className="docs-error">
                        <h2>{t('docs.notFound')}</h2>
                        <p>{t('docs.notFoundDesc')}</p>
                    </div>
                )}

                {error === 'load-failed' && (
                    <div className="docs-error">
                        <h2>{t('docs.loadError')}</h2>
                        <p>{t('docs.loadErrorDesc')}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="docs-markdown">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={components}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </main>
        </div>
    );
}

export default DocsViewer;
