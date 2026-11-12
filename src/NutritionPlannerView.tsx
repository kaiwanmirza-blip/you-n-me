import { useState } from 'react'
import {
  compareNutritionPlans,
  defaultPantryInventory,
  elapsedCookPresets,
  exclusionIngredientCatalog,
  formatQuantity,
  kitchenDeviceCatalog,
  type KitchenDeviceId,
  type NutritionPreviewResult,
  type PantryItem,
} from './nutritionPreview'
import { modeLabel } from './fitnessPreview'

export function NutritionPlannerView({
  guide,
  units,
  nutritionGoal,
  onChangeNutritionGoal,
  nutritionInput,
  onChangeNutritionInput,
  devices,
  onChangeDevices,
  pantry,
  onChangePantry,
  candidate,
  selected,
  previousVersion,
  completedMeals,
  comparisonEnabled,
  onGenerate,
  onApplySubstitution,
  onSelectSessionPlan,
  onToggleMealComplete,
  onSubViewChange,
}: {
  guide: 'Jane' | 'Kay'
  units: 'us-customary' | 'metric'
  nutritionGoal: string
  onChangeNutritionGoal: (val: string) => void
  nutritionInput: NutritionPreviewResult['plan']['input']
  onChangeNutritionInput: (next: NutritionPreviewResult['plan']['input']) => void
  devices: KitchenDeviceId[]
  onChangeDevices: (next: KitchenDeviceId[]) => void
  pantry: PantryItem[]
  onChangePantry: (next: PantryItem[]) => void
  candidate: NutritionPreviewResult | null
  selected: NutritionPreviewResult | null
  previousVersion: NutritionPreviewResult | null
  completedMeals: string[]
  comparisonEnabled: boolean
  onGenerate: (override?: {
    goal?: string
    input?: NutritionPreviewResult['plan']['input']
    devices?: KitchenDeviceId[]
  }) => void
  onApplySubstitution: (mealId: string, subId: string) => void
  onSelectSessionPlan: () => void
  onToggleMealComplete: (mealId: string) => void
  onSubViewChange: (sub: 'overview' | 'cooking') => void
}) {
  const [customExclusionInput, setCustomExclusionInput] = useState('')
  const [showPantryEditor, setShowPantryEditor] = useState(false)

  const displayed = candidate ?? selected
  const isSelected = displayed !== null && displayed === selected
  const diffPoints = displayed ? compareNutritionPlans(previousVersion?.plan ?? null, displayed.plan) : []

  function toggleDevice(id: KitchenDeviceId) {
    if (devices.includes(id)) {
      onChangeDevices(devices.filter(d => d !== id))
    } else {
      onChangeDevices([...devices, id])
    }
  }

  function toggleExclusion(id: string) {
    const current = nutritionInput.excludedIngredients
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    onChangeNutritionInput({
      ...nutritionInput,
      allergyAcknowledgement: next.length > 0 ? 'listed' : nutritionInput.allergyAcknowledgement,
      excludedIngredients: next,
    })
  }

  function addCustomExclusion() {
    const clean = customExclusionInput.trim().toLowerCase()
    if (!clean) return
    if (!nutritionInput.excludedIngredients.includes(clean)) {
      onChangeNutritionInput({
        ...nutritionInput,
        allergyAcknowledgement: 'listed',
        excludedIngredients: [...nutritionInput.excludedIngredients, clean],
      })
    }
    setCustomExclusionInput('')
  }

  return (
    <div className="stack-lg">
      {/* Reviewer Quick Presets Bar */}
      <section className="card soft" aria-label="Nutrition scenario presets">
        <div className="section-heading">
          <p className="eyebrow">REVIEWER SCENARIO PRESETS · NUTRITION</p>
          <span className="fine">Click a scenario to prefill constraints and generate immediately</span>
        </div>
        <div className="button-row">
          <button
            type="button"
            className="secondary"
            onClick={() => {
              const nextInput = {
                dietaryPattern: 'Balanced',
                meals: 3,
                servings: 1,
                preparationMinutes: 30,
                allergyAcknowledgement: 'none' as const,
                excludedIngredients: [],
                cuisine: 'Mediterranean & Everyday',
                budgetBand: 'Standard ($12–$20/serving)',
              }
              const nextDevs: KitchenDeviceId[] = ['stovetop', 'air-fryer', 'oven', 'microwave']
              onChangeNutritionGoal('Plan one day of balanced meals from my pantry.')
              onChangeNutritionInput(nextInput)
              onChangeDevices(nextDevs)
              onGenerate({
                goal: 'Plan one day of balanced meals from my pantry.',
                input: nextInput,
                devices: nextDevs,
              })
            }}
          >
            1. Baseline: Balanced · 1 Serving · 3 Meals · 30m
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              const nextInput = {
                dietaryPattern: 'Balanced',
                meals: 1,
                servings: 2,
                preparationMinutes: 30,
                allergyAcknowledgement: 'none' as const,
                excludedIngredients: [],
                cuisine: 'Mediterranean & Everyday',
                budgetBand: 'Standard ($12–$20/serving)',
              }
              const nextDevs: KitchenDeviceId[] = ['air-fryer', 'stovetop']
              const nextGoal =
                'I have chicken, rice, spinach and a lemon, plus an air fryer and a stovetop. I need two servings on the table in 30 minutes.'
              onChangeNutritionGoal(nextGoal)
              onChangeNutritionInput(nextInput)
              onChangeDevices(nextDevs)
              onGenerate({ goal: nextGoal, input: nextInput, devices: nextDevs })
            }}
          >
            2. Kitchen Prompt: Chicken, Rice, Spinach & Lemon (2 Servings · 30m · Air Fryer + Stovetop)
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              const nextInput = {
                dietaryPattern: 'Vegetarian',
                meals: 3,
                servings: 2,
                preparationMinutes: 30,
                allergyAcknowledgement: 'listed' as const,
                excludedIngredients: ['tomatoes'],
                cuisine: 'Mediterranean & Everyday',
                budgetBand: 'Standard ($12–$20/serving)',
              }
              const nextDevs: KitchenDeviceId[] = ['stovetop', 'air-fryer', 'oven']
              const nextGoal = 'Plan a full Vegetarian day for 2 servings with no tomatoes.'
              onChangeNutritionGoal(nextGoal)
              onChangeNutritionInput(nextInput)
              onChangeDevices(nextDevs)
              onGenerate({ goal: nextGoal, input: nextInput, devices: nextDevs })
            }}
          >
            3. Reviewer Path: 2 Servings · Vegetarian · No Tomatoes
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              const nextInput = {
                dietaryPattern: 'Balanced',
                meals: 1,
                servings: 4,
                preparationMinutes: 180,
                allergyAcknowledgement: 'none' as const,
                excludedIngredients: [],
                cuisine: 'Holiday Roast',
                budgetBand: 'Standard ($12–$20/serving)',
              }
              const nextDevs: KitchenDeviceId[] = ['oven', 'stovetop']
              const nextGoal = 'Prepare a 3-hour (180-minute) whole roast turkey dinner with rice pilaf.'
              onChangeNutritionGoal(nextGoal)
              onChangeNutritionInput(nextInput)
              onChangeDevices(nextDevs)
              onGenerate({ goal: nextGoal, input: nextInput, devices: nextDevs })
            }}
          >
            4. 3-Hour Turkey Scenario (180m · Prep / Cook / Rest Breakdown)
          </button>
        </div>
      </section>

      {/* Editable Nutrition Constraints Form */}
      <form
        className="card form-card"
        onSubmit={e => {
          e.preventDefault()
          onGenerate()
        }}
        noValidate
      >
        <div className="section-heading">
          <p className="tag">Fictional Sample Kitchen · Editable Constraints</p>
          <span className="fine">Units: {units === 'us-customary' ? 'US Customary (oz/cups)' : 'Metric (g/ml)'}</span>
        </div>

        <label htmlFor="nutrition-goal">Practical Nutrition Goal</label>
        <textarea
          id="nutrition-goal"
          rows={2}
          maxLength={400}
          value={nutritionGoal}
          onChange={e => onChangeNutritionGoal(e.target.value)}
        />
        <p className="help">
          Everyday meal planning only. No calculated calorie targets, therapeutic diets, or clinical prescriptions.
        </p>

        <div className="field-row">
          <div>
            <label htmlFor="dietary-pattern">Dietary pattern</label>
            <select
              id="dietary-pattern"
              value={nutritionInput.dietaryPattern}
              onChange={e =>
                onChangeNutritionInput({ ...nutritionInput, dietaryPattern: e.target.value })
              }
            >
              <option value="Balanced">Balanced (Poultry, grains, legumes & produce)</option>
              <option value="Vegetarian">Vegetarian (Plant proteins, grains & produce)</option>
              <option value="Keto therapeutic (unsupported)">
                Keto therapeutic · Unsupported clinical diet (test rejection)
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="meals-count">Meals for the day (1–4)</label>
            <select
              id="meals-count"
              value={nutritionInput.meals}
              onChange={e =>
                onChangeNutritionInput({ ...nutritionInput, meals: Number(e.target.value) })
              }
            >
              <option value={1}>1 meal (Single dinner or feast)</option>
              <option value={2}>2 meals (Lunch & Dinner)</option>
              <option value={3}>3 meals (Breakfast, Lunch & Dinner · default)</option>
              <option value={4}>4 meals (3 meals + evening bowl)</option>
            </select>
          </div>
        </div>

        <div className="field-row">
          <div>
            <label htmlFor="servings-input">Servings per meal (1–12)</label>
            <input
              id="servings-input"
              type="number"
              min={1}
              max={12}
              step={1}
              value={nutritionInput.servings}
              onChange={e =>
                onChangeNutritionInput({
                  ...nutritionInput,
                  servings: Math.max(1, Math.min(12, Number(e.target.value) || 1)),
                })
              }
            />
            <small className="help">Scales recipe quantities, portions, and consolidated shopping totals together.</small>
          </div>
          <div>
            <label htmlFor="cook-time-preset">Maximum elapsed cook time budget</label>
            <select
              id="cook-time-preset"
              value={nutritionInput.preparationMinutes}
              onChange={e =>
                onChangeNutritionInput({
                  ...nutritionInput,
                  preparationMinutes: Number(e.target.value),
                })
              }
            >
              {elapsedCookPresets.map(mins => (
                <option key={mins} value={mins}>
                  {mins === 15
                    ? '15 minutes · Fast skillet & flash meals'
                    : mins === 30
                      ? '30 minutes · Standard weeknight air-fryer & stovetop'
                      : mins === 60
                        ? '60 minutes · Unhurried batch cooking'
                        : '180 minutes (3 hours) · Whole roast turkey centerpiece'}
                </option>
              ))}
            </select>
            <small className="help">
              Distinguishes total elapsed time (prep + active cooking + resting) and rejects recipes over budget.
            </small>
          </div>
        </div>

        <div className="field-row">
          <div>
            <label htmlFor="budget-band">Budget band (optional)</label>
            <select
              id="budget-band"
              value={nutritionInput.budgetBand ?? 'Standard ($12–$20/serving)'}
              onChange={e =>
                onChangeNutritionInput({ ...nutritionInput, budgetBand: e.target.value })
              }
            >
              <option value="Standard ($12–$20/serving)">Standard ($12–$20/serving)</option>
              <option value="Modest ($8–$12/serving)">Modest ($8–$12/serving)</option>
              <option value="Tight (under $5/day)">
                Tight (under $5/day · rejects 180m turkey or 6+ servings)
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="allergy-ack">Explicit Allergy & Exclusion Acknowledgement (Required)</label>
            <select
              id="allergy-ack"
              value={nutritionInput.allergyAcknowledgement}
              onChange={e => {
                const ack = e.target.value as NutritionPreviewResult['plan']['input']['allergyAcknowledgement']
                onChangeNutritionInput({
                  ...nutritionInput,
                  allergyAcknowledgement: ack,
                  excludedIngredients:
                    ack === 'none'
                      ? []
                      : ack === 'listed' && nutritionInput.excludedIngredients.length === 0
                        ? ['tomatoes']
                        : nutritionInput.excludedIngredients,
                })
              }}
            >
              <option value="none">None stated</option>
              <option value="listed">List ingredients to avoid (requires non-empty list)</option>
              <option value="unknown">Unknown · offer generic labelled preview only</option>
              <option value="prefer-not-to-say">Prefer not to say · offer generic labelled preview only</option>
            </select>
          </div>
        </div>

        {nutritionInput.allergyAcknowledgement === 'listed' && (
          <fieldset className="exclusions">
            <legend>Ingredients to avoid (Honored across recipes, substitutions & shopping list)</legend>
            <div className="checkbox-grid">
              {exclusionIngredientCatalog.map(item => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={nutritionInput.excludedIngredients.includes(item.id)}
                    onChange={() => toggleExclusion(item.id)}
                  />
                  Avoid {item.label}
                </label>
              ))}
            </div>
            <div className="field-row">
              <div>
                <label htmlFor="custom-exclusion">Add custom ingredient to avoid</label>
                <input
                  id="custom-exclusion"
                  type="text"
                  placeholder="e.g. peanuts, shellfish, cilantro"
                  value={customExclusionInput}
                  onChange={e => setCustomExclusionInput(e.target.value)}
                />
              </div>
              <div className="align-end">
                <button type="button" className="secondary" onClick={addCustomExclusion}>
                  Add Exclusion
                </button>
              </div>
            </div>
            <p className="fine">
              Active exclusions:{' '}
              <strong>{nutritionInput.excludedIngredients.join(', ') || 'None selected (select at least one)'}</strong>
            </p>
          </fieldset>
        )}

        <fieldset className="exclusions">
          <legend>Available Kitchen Appliances (Multi-select)</legend>
          <div className="checkbox-grid">
            {kitchenDeviceCatalog.map(dev => (
              <label key={dev.id}>
                <input
                  type="checkbox"
                  checked={devices.includes(dev.id)}
                  onChange={() => toggleDevice(dev.id)}
                />
                {dev.label} <small className="muted">({dev.note})</small>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="pantry-toggle-bar">
          <button
            type="button"
            className="secondary"
            onClick={() => setShowPantryEditor(s => !s)}
          >
            {showPantryEditor ? 'Hide Declared Pantry Inventory' : `Inspect / Edit Pantry Inventory (${pantry.filter(p => p.onHandAmount > 0).length} items on hand)`}
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => onChangePantry(defaultPantryInventory.map(p => ({ ...p })))}
          >
            Reset default pantry
          </button>
        </div>

        {showPantryEditor && (
          <div className="card soft stack-sm" aria-label="Pantry quantities on hand">
            <p className="fine">
              Adjust what you currently have in your kitchen. The shopping list automatically separates what is on hand
              from shortages you need to buy.
            </p>
            <div className="preview-grid">
              {pantry.map((item, idx) => (
                <div className="pantry-item-box" key={item.ingredientId}>
                  <label htmlFor={`pantry-${item.ingredientId}`}>
                    {item.name} ({item.unit})
                  </label>
                  <input
                    id={`pantry-${item.ingredientId}`}
                    type="number"
                    min={0}
                    step={item.unit === 'count' ? 1 : 25}
                    value={item.onHandAmount}
                    onChange={e => {
                      const next = [...pantry]
                      next[idx] = { ...item, onHandAmount: Math.max(0, Number(e.target.value) || 0) }
                      onChangePantry(next)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="button-row">
          <button type="submit" className="primary">
            {displayed ? 'Update sample plan' : 'Preview sample plan'}
          </button>
        </div>
      </form>

      {/* Generated Nutrition Plan & Shopping List Display */}
      {displayed && (
        <>
          {displayed.isGenericAllergyPreview && (
            <div className="error" role="status">
              <strong>Generic Labelled Preview Only:</strong> Because allergy acknowledgement is set to “
              {displayed.plan.input.allergyAcknowledgement}”, this menu is a generic sample preview and is NOT tailored
              to personal allergens. {displayed.allergySafetyNotice}
            </div>
          )}

          {diffPoints.length > 0 && (
            <div className="notice" role="status">
              <strong>What changed & why:</strong>
              <ul>
                {diffPoints.map(pt => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {comparisonEnabled && previousVersion && previousVersion !== displayed && (
            <section className="card soft" aria-label="Side-by-side Nutrition plan comparison">
              <p className="eyebrow">SIMULATED PLUS / PRO · SIDE-BY-SIDE PLAN VERSION COMPARISON</p>
              <div className="field-row">
                <div>
                  <h3>Previous / Selected Version</h3>
                  <p className="fine">
                    {previousVersion.plan.input.dietaryPattern} · {previousVersion.plan.input.servings} serving(s) ·{' '}
                    {previousVersion.plan.input.preparationMinutes}m budget
                  </p>
                  <ul>
                    {previousVersion.plan.meals.map(m => (
                      <li key={m.id}>
                        {m.title} ({m.servings} serv)
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Current Candidate Version</h3>
                  <p className="fine">
                    {displayed.plan.input.dietaryPattern} · {displayed.plan.input.servings} serving(s) ·{' '}
                    {displayed.plan.input.preparationMinutes}m budget
                  </p>
                  <ul>
                    {displayed.plan.meals.map(m => (
                      <li key={m.id}>
                        {m.title} ({m.servings} serv)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <div className="plan-layout">
            <aside className="card plan-summary">
              <p className="tag">{modeLabel(displayed.provenance.mode as 'guided' | 'demo')}</p>
              <p className="duration">
                <strong>{displayed.plan.meals.length}</strong> {displayed.plan.meals.length === 1 ? 'meal' : 'meals'} ·{' '}
                <strong>{displayed.plan.input.servings}</strong>{' '}
                {displayed.plan.input.servings === 1 ? 'serving' : 'servings'}
              </p>
              <h2>One-day kitchen plan & shopping list</h2>
              <p>{displayed.plan.explanation}</p>
              <dl>
                <dt>Goal used</dt>
                <dd>{displayed.goal}</dd>
                <dt>Dietary pattern & servings</dt>
                <dd>
                  {displayed.plan.input.dietaryPattern} · {displayed.plan.input.servings} serving(s) (per-recipe
                  quantities shown)
                </dd>
                <dt>Max elapsed cook budget</dt>
                <dd>{displayed.elapsedCookBudgetMinutes} minutes</dd>
                <dt>Appliances available</dt>
                <dd>{displayed.devicesSelected.join(', ')}</dd>
                <dt>Excluded ingredients</dt>
                <dd>{displayed.plan.input.excludedIngredients.join(', ') || 'None stated'}</dd>
                <dt>Original source</dt>
                <dd>Sample · {displayed.provenance.source === 'sample' ? displayed.provenance.fixtureId : 'provider'}</dd>
              </dl>

              {!isSelected ? (
                <button type="button" className="primary" onClick={onSelectSessionPlan}>
                  Use this plan for this session
                </button>
              ) : (
                <p role="status" className="selected-note">
                  ✓ Using this Nutrition plan · {completedMeals.length} / {displayed.plan.meals.length} meals completed
                </p>
              )}
              <p className="fine">{displayed.allergySafetyNotice} Nothing is durably saved; refresh resets this session.</p>
            </aside>

            <section className="action-list" aria-label="One-day meals and consolidated shopping list">
              <div className="button-row">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => onSubViewChange('overview')}
                >
                  Guide Mode: Nutrition Guide Wardrobe
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => onSubViewChange('cooking')}
                >
                  Active Cooking Mode: Switch {guide} to Chef Wardrobe
                </button>
              </div>

              {displayed.plan.meals.map((meal, index) => {
                const meta = displayed.mealMeta[meal.id]
                const done = isSelected && completedMeals.includes(meal.id)
                return (
                  <article className={`card action-card ${done ? 'done' : ''}`} key={meal.id}>
                    <div className="action-top">
                      <span className="step-number">0{index + 1}</span>
                      <span className="eyebrow">
                        MEAL · {meal.servings} {meal.servings === 1 ? 'SERVING' : 'SERVINGS'} ({meal.quantityBasis})
                      </span>
                      <span>Elapsed: {meal.preparationMinutes} min</span>
                    </div>
                    <h2>{meal.title}</h2>
                    <p>
                      <strong>Approximate portion:</strong> {meal.portion}
                    </p>
                    {meta && (
                      <div className="timing">
                        <span>Prep: {meta.prepMinutes} min</span>
                        <span>Active cook: {meta.activeCookMinutes} min</span>
                        <span>Rest: {meta.restMinutes} min</span>
                        <span>Total elapsed: {meta.elapsedMinutes} min</span>
                        <span>Appliances: {meta.appliancesUsed.join(', ')}</span>
                      </div>
                    )}
                    {meta?.safeTempDeferralNote && (
                      <p className="notice">{meta.safeTempDeferralNote}</p>
                    )}

                    <h3>Recipe Quantities (Scaled for {meal.servings} {meal.servings === 1 ? 'serving' : 'servings'})</h3>
                    <ul>
                      {meal.ingredients.map(ing => (
                        <li key={ing.ingredientId}>
                          <strong>{ing.name}:</strong> {formatQuantity(ing.amount, ing.unit, units)}{' '}
                          <span className="fine">
                            ({ing.pantry ? 'Available in declared pantry' : 'Not in declared pantry'})
                          </span>
                        </li>
                      ))}
                    </ul>

                    <h3>Ordered Preparation Steps</h3>
                    <ol>
                      {meal.instructions.map(step => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>

                    {meta && meta.availableSubstitutions.length > 0 && (
                      <div className="card soft stack-sm">
                        <p className="eyebrow">INTERACTIVE INGREDIENT SUBSTITUTION</p>
                        {meta.appliedSubstitution ? (
                          <p className="fine">
                            ✓ Applied substitution: <strong>{meta.appliedSubstitution.label}</strong> —{' '}
                            {meta.appliedSubstitution.rationale}
                          </p>
                        ) : (
                          <p className="fine">
                            Apply a supported substitution to create a revised candidate and automatically recalculate
                            the shopping list:
                          </p>
                        )}
                        <div className="button-row">
                          {meta.availableSubstitutions.map(sub => (
                            <button
                              key={sub.id}
                              type="button"
                              className="secondary"
                              disabled={meta.appliedSubstitution?.id === sub.id}
                              onClick={() => onApplySubstitution(meal.id, sub.id)}
                            >
                              {meta.appliedSubstitution?.id === sub.id ? `✓ ${sub.label}` : `Apply: ${sub.label}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="button-row">
                      <button
                        type="button"
                        className="secondary"
                        disabled={!isSelected}
                        onClick={() => onToggleMealComplete(meal.id)}
                      >
                        {done ? 'Undo meal completion' : 'Mark meal prepared / complete'}
                      </button>
                    </div>
                    {!isSelected && <small>Select “Use this plan for this session” to record meal completion.</small>}
                  </article>
                )
              })}

              {/* Consolidated Shopping List vs Pantry Shortages */}
              <article className="card" aria-label="Consolidated shopping list and pantry comparison">
                <div className="section-heading">
                  <p className="eyebrow">CONSOLIDATED SHOPPING LIST VS. DECLARED PANTRY</p>
                  <span className="tag">Sums all recipe quantities · Individual ingredients do not count as progress</span>
                </div>
                <h2>What You Need vs. What Is On Hand</h2>
                <div className="field-row">
                  <div className="card soft">
                    <h3>Shortages to Buy ({displayed.shoppingBreakdown.filter(i => i.shortageAmount > 0).length})</h3>
                    {displayed.shoppingBreakdown.filter(i => i.shortageAmount > 0).length === 0 ? (
                      <p className="fine">All required quantities are covered by your declared pantry inventory!</p>
                    ) : (
                      <ul>
                        {displayed.shoppingBreakdown
                          .filter(i => i.shortageAmount > 0)
                          .map(item => (
                            <li key={`${item.ingredientId}:${item.unit}`}>
                              <strong>{item.name}:</strong> Buy{' '}
                              <strong>{formatQuantity(item.shortageAmount, item.unit, units)}</strong>{' '}
                              <span className="fine">
                                (Recipe total: {formatQuantity(item.requiredAmount, item.unit, units)} · On hand:{' '}
                                {formatQuantity(item.onHandAmount, item.unit, units)})
                              </span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className="card soft">
                    <h3>Covered by Pantry On Hand ({displayed.shoppingBreakdown.filter(i => i.shortageAmount === 0).length})</h3>
                    <ul>
                      {displayed.shoppingBreakdown
                        .filter(i => i.shortageAmount === 0)
                        .map(item => (
                          <li key={`${item.ingredientId}:${item.unit}`}>
                            <strong>{item.name}:</strong> {formatQuantity(item.requiredAmount, item.unit, units)} needed{' '}
                            <span className="fine">
                              (Covered · {formatQuantity(item.onHandAmount, item.unit, units)} in pantry)
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </>
      )}
    </div>
  )
}
